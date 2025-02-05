from firebase_functions import https_fn
from firebase_admin import initialize_app
from openai import OpenAI, beta
from pydantic import BaseModel
from dotenv import load_dotenv
from typing import List
import os
import json  # Import the json module

class ImportantPerson(BaseModel):
    name: str
    jobFunction: str 

class ImportantDate(BaseModel):
    event: str
    date: str
class ContextData(BaseModel):
    perons: List[ImportantPerson]
    dates: List[ImportantDate]


initialize_app()

load_dotenv()

api_key = os.environ.get("OPENAI_API_KEY")

if api_key is None:
    raise ValueError("The OPENAI_API_KEY environment variable is not set.")

client = OpenAI(api_key=api_key)


@https_fn.on_request(region="europe-west4", timeout_sec=120)
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