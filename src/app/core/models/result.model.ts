// types for the structure of the analyzed document data, bounding box for drawing on the PDF for each actor mentioned
export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ActorMentioned {
  actorName: string;
  mentioned: boolean;
  explanation: string;
  bounding_box: BoundingBox;
}

export interface AnalyzedDocument {
  document_creator: string;
  importance: number;
  actors_mentioned: ActorMentioned[];
  page_number: number;
  base64Image: string;
}
