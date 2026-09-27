import sys
sys.dont_write_bytecode = True

from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from weeklyConsumption.ConsumptionService import predict
from weeklyPricePrediction.predictPrice import predictPrice
from carbon.carbonPrediction import predict_carbon
import joblib
from ecky.ecky import invoke_agent
from weeklyPriceUser.predictUserPrices import predictUserPrices

app = FastAPI()

@app.get("/")
def home():
    return {"status": "running"}

@app.post("/weeklyConsumption")
def weekly_consumption(data: dict):
    return predict(data)

@app.post("/ecky-model")
def predict_ecky(data: dict):
    question = data.get("question") or data.get("prompt") or data.get("content") or data.get("message") or ""
    user_id = data.get("userId") or data.get("user_id") or "08334a7b-52ee-415c-a365-1b5dceea83e0"
    return invoke_agent(question, user_id=user_id)

@app.post("/pricePrediction")
def weekly_price(data: dict):
    result = predictPrice(data)
    return result

@app.post("/carbonPrediction")
def weekly_carbon(data: dict):
    carbon_values = data.get("carbon_values", [])
    result = predict_carbon(carbon_values)
    return {"predictions": result}

@app.post("/predict-user-price")
def weekly_user_price(data: dict):
    past_week_price = data.get("past_week_price", [])
    return predictUserPrices(past_week_price)