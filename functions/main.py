from firebase_functions import https_fn, storage_fn
from firebase_admin import initialize_app, firestore, storage 

from openai import OpenAI, beta
from pydantic import BaseModel
from concurrent.futures import ThreadPoolExecutor
from dotenv import load_dotenv

from typing import List

import requests
import PyPDF2
import io
import os
import logging
import json  

class ImportantPerson(BaseModel):
    name: str
    jobFunction: str 

class ImportantDate(BaseModel):
    event: str
    date: str
class ContextData(BaseModel):
    persons: List[ImportantPerson]
    dates: List[ImportantDate]


initialize_app()

load_dotenv()

api_key = os.environ.get("OPENAI_API_KEY")

if api_key is None:
    raise ValueError("The OPENAI_API_KEY environment variable is not set.")

client = OpenAI(api_key=api_key)

@storage_fn.on_object_finalized(region="europe-west4")
def on_file_upload(event: storage_fn.CloudEvent[storage_fn.StorageObjectData]) -> None:
    db = firestore.client()
    bucket = storage.bucket()
    
    file_data = event.data
    file_name = file_data.name
    content_type = file_data.content_type
    size = file_data.size
    metadata = file_data.metadata
    uuid = metadata.get('uuid') if metadata else None 

    try:
        # Download and process PDF
        blob = bucket.blob(file_name)
        contents = blob.download_as_bytes()
        
        all_persons = []
        all_dates = []

        if content_type == 'application/pdf':
            pdf_file = io.BytesIO(contents)
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            
            # Get cloud function URL
            function_url = "https://call-openai-cjyhwselka-ez.a.run.app"  
            
            # Extract text from all pages
            page_texts = [page.extract_text() for page in pdf_reader.pages]

            # Analyze all pages in parallel
            def process_page(page_text):
                try:
                    response = requests.post(
                        function_url,
                        json={'user_input': page_text},
                        headers={'Content-Type': 'application/json'}
                    )
                    if response.status_code == 200:
                        return response.json()  # Return parsed data from OpenAI function
                    else:
                        logging.error(f"Error processing page: {response.text}")
                        return None
                except Exception as e:
                    logging.error(f"Exception while processing page: {str(e)}")
                    return None
            
            # Use ThreadPoolExecutor to process pages concurrently
            with ThreadPoolExecutor() as executor:
                results = list(executor.map(process_page, page_texts))

            # Combine results from all pages
            for result in results:
                if result and isinstance(result, dict):
                    persons_data = result.get('persons', [])
                    dates_data = result.get('dates', [])
                    if persons_data:
                        all_persons.extend(persons_data)
                    if dates_data:
                        all_dates.extend(dates_data)

        # Remove duplicates (if any)
        unique_persons = {(p['name'], p['jobFunction']): p for p in all_persons}.values()
        unique_dates = {(d['date'], d['event']): d for d in all_dates}.values()

        # Prepare document data
        file_doc = {
            'fileName': file_name,
            'contentType': content_type,
            'size': size,
            'storagePath': f"gs://{bucket.name}/{file_name}",
            'uploadedAt': firestore.SERVER_TIMESTAMP,
            'initialized': True,
            'important_people': list(unique_persons),
            'important_dates': list(unique_dates)
        }

        # Save to Firestore
        doc_ref = db.collection('files').document(uuid)
        doc_ref.set(file_doc)
        
        logging.info(f"File processed and saved to Firestore: {file_name}")

    except Exception as e:
        logging.error(f"Error processing file {file_name}: {str(e)}")
        raise e


@https_fn.on_request(region="europe-west4", timeout_sec=120, max_instances=500)
def call_openai(req: https_fn.Request) -> https_fn.Response:
    """
    Firebase Cloud Function to call OpenAI's GPT-4 model.
    Accepts user input as a string in the request body (JSON format).
    Returns the OpenAI response as a JSON response, handling CORS.
    """

    # --- CORS Handling ---
    # Set CORS headers to allow requests from any origin (for development, adjust for production)
    headers = {
        'Access-Control-Allow-Origin': '*',  # Or your specific frontend domain in production
        'Access-Control-Allow-Methods': 'POST, OPTIONS', # Allow POST and OPTIONS
        'Access-Control-Allow-Headers': 'Content-Type', # Allow Content-Type header
    }

    if req.method == 'OPTIONS':
        # Handle preflight request for CORS
        return https_fn.Response(status=204, headers=headers) # Respond with 204 No Content for OPTIONS

    # --- Input Processing ---
    try:
        request_json = req.get_json() # Get JSON data from request body
        if request_json and 'user_input' in request_json:
            user_input = request_json['user_input']
        else:
            return https_fn.Response(
                json.dumps({"error": "Missing 'user_input' in request body"}),
                status=400, # Bad Request
                headers=headers
            )
    except Exception as e:
        return https_fn.Response(
            json.dumps({"error": f"Error parsing request body: {str(e)}"}),
            status=400, # Bad Request
            headers=headers
        )

    # --- OpenAI API Call ---
    try:
        response = client.beta.chat.completions.parse(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Extract all data about perons and if available their job function, additionaly extract all dates and if available the event that happened on that day"},
                {"role": "user", "content": user_input},
            ],
            response_format=ContextData,

        )

        # Extract the content from the OpenAI response
        openai_response_content = response.choices[0].message.parsed

        openai_response_dict = openai_response_content.dict()


        return https_fn.Response(
            json.dumps(openai_response_dict), 
            status=200,
            headers=headers
        )



    except Exception as e:
        error_message = f"Error calling OpenAI API: {str(e)}"
        print(error_message)
        return https_fn.Response(
            json.dumps({"error": error_message}),
            status=500,
            headers=headers
        )