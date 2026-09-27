import os
import joblib
import pandas as pd

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "xgboost_cost_model.pkl"
)

pricePrediction = joblib.load(MODEL_PATH)

FEATURES = [
    "day_1_cost",
    "day_2_cost",
    "day_3_cost",
    "day_4_cost",
    "day_5_cost",
    "day_6_cost",
    "day_7_cost",
]


def predictUserPrices(data: list):
    if not data or all(x == 0 for x in data):
        return [0.0] * 7
    input_df = pd.DataFrame([data], columns=FEATURES)
    prediction = pricePrediction.predict(input_df)
    return prediction[0].tolist()
