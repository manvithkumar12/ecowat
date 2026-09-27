import os
import joblib
import pandas as pd

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "carbon_prediction_model.pkl"
)

model = joblib.load(MODEL_PATH)

def predict_carbon(carbon_values):

    input_data = pd.DataFrame(
        [carbon_values],
        columns=[
            "day1",
            "day2",
            "day3",
            "day4",
            "day5",
            "day6",
            "day7"
        ]
    )

    prediction = model.predict(input_data)

    return prediction[0].tolist()