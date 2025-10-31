from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


# New Models for Love Confession Response
class LoveResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    response: str  # "yes" or "maybe"
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class LoveResponseCreate(BaseModel):
    response: str  # "yes" or "maybe"
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# ============== Love Confession Response Endpoints ==============

@api_router.post("/confession/response", response_model=LoveResponse)
async def save_love_response(input: LoveResponseCreate):
    """
    Save the user's response to the confession question
    """
    try:
        # Validate response
        if input.response not in ["yes", "maybe"]:
            raise HTTPException(status_code=400, detail="Response must be 'yes' or 'maybe'")
        
        # Create response object
        response_dict = input.model_dump()
        response_obj = LoveResponse(**response_dict)
        
        # Convert to dict and serialize datetime to ISO string for MongoDB
        doc = response_obj.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        
        # Save to MongoDB
        result = await db.responses.insert_one(doc)
        
        logger.info(f"Love response saved: {input.response} at {doc['timestamp']}")
        
        return response_obj
    except Exception as e:
        logger.error(f"Error saving love response: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to save response")


@api_router.get("/confession/responses", response_model=List[LoveResponse])
async def get_all_love_responses():
    """
    Get all confession responses (for admin/viewing)
    """
    try:
        # Exclude MongoDB's _id field from the query results
        responses = await db.responses.find({}, {"_id": 0}).to_list(1000)
        
        # Convert ISO string timestamps back to datetime objects
        for resp in responses:
            if isinstance(resp['timestamp'], str):
                resp['timestamp'] = datetime.fromisoformat(resp['timestamp'])
        
        return responses
    except Exception as e:
        logger.error(f"Error fetching responses: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch responses")


@api_router.get("/confession/stats")
async def get_response_stats():
    """
    Get statistics about responses
    """
    try:
        total_responses = await db.responses.count_documents({})
        yes_count = await db.responses.count_documents({"response": "yes"})
        maybe_count = await db.responses.count_documents({"response": "maybe"})
        
        # Get latest response
        latest = await db.responses.find_one(
            {}, 
            {"_id": 0},
            sort=[("timestamp", -1)]
        )
        
        if latest and isinstance(latest.get('timestamp'), str):
            latest['timestamp'] = datetime.fromisoformat(latest['timestamp'])
        
        return {
            "total_responses": total_responses,
            "yes_count": yes_count,
            "maybe_count": maybe_count,
            "latest_response": latest
        }
    except Exception as e:
        logger.error(f"Error fetching stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch stats")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()