import os
from data.Features import FEATURES
import joblib
import pandas as pd

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "weekConsumption.pkl"
)

weeklyConsumptionModel = joblib.load(MODEL_PATH)
def predict(data: dict):    
    rows = []

    for day in data["weather"]:
        row = {
            "date": day["date"],
            "householdSize": data["householdSize"],
            "tempMin": day["tempMin"],
            "tempMax": day["tempMax"],
            "avgTemp": (day["tempMin"] + day["tempMax"]) / 2,
            "renewabilityScore": day["renewabilityScore"],
            "dayOfWeek": day["dayOfWeek"],
            "isWeekend": 1 if day["dayOfWeek"] in [0, 6] else 0,
            "month": data["month"],
            "yesterdayUsage": data["yesterdayUsage"],
            "avgLast7Days": data["avgLast7Days"],
            **data["appliances"]
        }

        for feature in FEATURES:
            row.setdefault(feature, 0)

        rows.append(row)
    

    df = pd.DataFrame(rows)

    predictions = weeklyConsumptionModel.predict(df[FEATURES])

    result = []

    for row, prediction in zip(rows, predictions):
        result.append({
            "date": row["date"],
            "predictedUsage": round(float(prediction), 2)
        })
    return {"predictions": result}
