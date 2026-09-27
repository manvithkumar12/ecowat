import joblib
import pandas as pd

FEATURES = ["temperatureMax","temperatureMin","dayOfWeek",
"month","isWeekend","lag1","lag7","rolling7",]

pricePrediction = joblib.load(
    "./weeklyPricePrediction/pricePrediction.pkl"
)

def predictPrice(data: dict):
    history_df = pd.DataFrame(data["days30Price"])
    future_df = pd.DataFrame(data["forecasts"])
    history_df["date"] = pd.to_datetime(history_df["date"])
    history_df["dayOfWeek"] = history_df["date"].dt.dayofweek
    history_df["month"] = history_df["date"].dt.month
    history_df["isWeekend"] = (
        history_df["dayOfWeek"].isin([5, 6])
    ).astype(int)
    history_df["lag1"] = history_df["price"].shift(1)
    history_df["lag7"] = history_df["price"].shift(7)
    history_df["rolling7"] = history_df["price"].rolling(7).mean()
    history_df = history_df.dropna()
    history_prices = list(
        history_df["price"].tail(7)
    )
    predictions = []
    for _, row in future_df.iterrows():
        feature_row = pd.DataFrame([{
            "temperatureMax": row["temperatureMax"],
            "temperatureMin": row["temperatureMin"],
            "dayOfWeek": row["dayOfWeek"],
            "month": row["month"],
            "isWeekend": row["isWeekend"],
            "lag1": history_prices[-1],
            "lag7": history_prices[0],
            "rolling7": sum(history_prices) / len(history_prices),
        }])
        feature_row = feature_row[FEATURES]
        predicted_price = pricePrediction.predict(
            feature_row
        )[0]
        predictions.append({
            "date": row["date"],
            "predictedPrice": round(
                float(predicted_price),
                2
            ),
        })
        history_prices.append(predicted_price)
        history_prices.pop(0)
    return {
        "predictions": predictions
    }