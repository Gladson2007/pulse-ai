import pandas as pd
from sklearn.ensemble import IsolationForest


def detect_sales_anomalies(df):

    if "sales" not in df.columns:
        return []

    data = df[["sales"]].copy()

    model = IsolationForest(
        contamination=0.1,
        random_state=42
    )

    data["anomaly"] = model.fit_predict(data[["sales"]])

    anomalies = []

    for index, row in data.iterrows():

        if row["anomaly"] == -1:

            anomalies.append({
                "index": int(index),
                "sales": float(row["sales"]),
                "status": "anomaly"
            })

    return anomalies