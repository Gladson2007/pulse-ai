import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression


def forecast_sales(df, future_days=7):

    if "date" not in df.columns or "sales" not in df.columns:
        return {
            "success": False,
            "message": "Date and sales columns are required."
        }

    data = df.copy()

    data["date"] = pd.to_datetime(data["date"], errors="coerce")

    data = data.dropna(subset=["date", "sales"])

    if len(data) < 3:
        return {
            "success": False,
            "message": "At least 3 data points are required."
        }

    data = data.sort_values("date")

    data["day_number"] = (
        data["date"] - data["date"].min()
    ).dt.days

    X = data[["day_number"]]
    y = data["sales"]

    model = LinearRegression()

    model.fit(X, y)

    last_day = int(data["day_number"].max())

    predictions = []

    for i in range(1, future_days + 1):

        future_day = last_day + i

        predicted_sales = model.predict(
            np.array([[future_day]])
        )[0]

        future_date = (
            data["date"].max()
            + pd.Timedelta(days=i)
        )

        predictions.append({
            "date": future_date.strftime("%Y-%m-%d"),
            "predicted_sales": round(
                float(predicted_sales), 2
            )
        })

    return {
        "success": True,
        "forecast_days": future_days,
        "predictions": predictions
    }