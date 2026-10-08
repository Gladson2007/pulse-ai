from insights import generate_basic_insight
from forecast import forecast_sales
from anomaly import detect_sales_anomalies
from analytics import detect_chart_type
from sql_security import validate_sql
from ai_sql import generate_sql_with_ai
from ai_sql import generate_sql_with_ai
from nlp_to_sql import generate_sql
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd

from database import test_database_connection, save_dataframe, engine
from sqlalchemy import text
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

from database import test_database_connection, save_dataframe

app = FastAPI()
class SQLQuery(BaseModel):
    query: str

@app.get("/forecast")
def get_forecast():

    try:

        with engine.connect() as connection:

            result = connection.execute(
                text("SELECT * FROM sales_data")
            )

            rows = [
                dict(row._mapping)
                for row in result
            ]

        df = pd.DataFrame(rows)

        forecast = forecast_sales(
            df,
            future_days=7
        )

        return forecast

    except Exception as error:

        return {
            "success": False,
            "message": str(error)
        }

@app.get("/anomalies")
def get_anomalies():

    try:

        with engine.connect() as connection:

            result = connection.execute(
                text("SELECT * FROM sales_data")
            )

            rows = [
                dict(row._mapping)
                for row in result
            ]

        df = pd.DataFrame(rows)

        anomalies = detect_sales_anomalies(df)

        return {
            "success": True,
            "total_anomalies": len(anomalies),
            "anomalies": anomalies
        }

    except Exception as error:

        return {
            "success": False,
            "message": str(error)
        }
@app.post("/ai-query")
def ai_query(request: SQLQuery):

    try:
        # 1. Generate SQL
        sql = generate_sql_with_ai(request.query)

        # 2. Security validation
        is_safe, message = validate_sql(sql)

        if not is_safe:
            return {
                "success": False,
                "stage": "security",
                "message": message
            }

        # 3. Execute SQL
        with engine.connect() as connection:

            result = connection.execute(text(sql))

            rows = [
                dict(row._mapping)
                for row in result
            ]

        # 4. Detect chart
        chart_type = detect_chart_type(rows)

        return {
            "success": True,
            "question": request.query,
            "generated_sql": sql,
            "chart_type": chart_type,
            "rows": rows
        }

    except Exception as error:

        return {
            "success": False,
            "message": str(error)
        }

@app.post("/ai-query")
def ai_query(request: SQLQuery):

    try:
        # Step 1: Generate SQL using AI
        sql = generate_sql_with_ai(request.query)

        # Step 2: Validate SQL
        is_safe, message = validate_sql(sql)

        if not is_safe:
            return {
                "success": False,
                "stage": "security",
                "message": message
            }

        # Step 3: Execute safe SQL
        with engine.connect() as connection:

            result = connection.execute(text(sql))

            rows = [
                dict(row._mapping)
                for row in result
            ]

        # Step 4: Return result
        insight = generate_basic_insight(rows)
        return {
            "success": True,
            "question": request.query,
            "generated_sql": sql,
            "rows": rows,
            "insight": insight
        }
    

    except Exception as error:

        return {
            "success": False,
            "message": str(error)
        }


@app.post("/ai-ask")
def ai_ask_question(request: SQLQuery):

    try:
        sql = generate_sql_with_ai(request.query)

        return {
            "success": True,
            "question": request.query,
            "generated_sql": sql
        }

    except Exception as error:

        return {
            "success": False,
            "message": str(error)
        }

@app.post("/query")
def run_query(request: SQLQuery):

    query = request.query.strip()

    if not query.lower().startswith("select"):
        return {
            "success": False,
            "message": "Only SELECT queries are allowed."
        }

    try:
        with engine.connect() as connection:
            result = connection.execute(text(query))

            rows = [dict(row._mapping) for row in result]

        return {
            "success": True,
            "query": query,
            "rows": rows
        }

    except Exception as error:
        return {
            "success": False,
            "message": str(error)
        }
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "PULSE AI Backend is running!"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "PULSE AI"
    }


@app.get("/database-test")
def database_test():

    result = test_database_connection()

    return {
        "database": "connected",
        "test_result": result
    }
@app.post("/ask")
def ask_question(request: SQLQuery):

    question = request.query

    sql = generate_sql(question)

    if sql is None:
        return {
            "success": False,
            "message": "I could not understand this question yet."
        }

    return {
        "success": True,
        "question": question,
        "generated_sql": sql
    }


def detect_column_type(series):

    if pd.api.types.is_numeric_dtype(series):
        return "numerical"

    date_series = pd.to_datetime(
        series,
        errors="coerce"
    )

    valid_dates = date_series.notna().sum()

    if valid_dates >= len(series) * 0.8:
        return "date"

    return "categorical"


@app.post("/upload")
async def upload_dataset(
    file: UploadFile = File(...)
):

    if not file.filename.lower().endswith(".csv"):
        return {
            "success": False,
            "message": "Only CSV files are allowed."
        }

    df = pd.read_csv(file.file)

    # Clean column names
    df.columns = (
        df.columns
        .str.strip()
        .str.lower()
        .str.replace(" ", "_")
    )

    column_details = []

    for column in df.columns:

        missing = int(df[column].isna().sum())
        unique = int(df[column].nunique())

        detected_type = detect_column_type(
            df[column]
        )

        column_details.append({
            "name": column,
            "data_type": str(df[column].dtype),
            "detected_type": detected_type,
            "missing_values": missing,
            "unique_values": unique
        })

    total_missing = int(
        df.isna().sum().sum()
    )

    # Save dataset to PostgreSQL
    save_dataframe(
        df,
        "sales_data"
    )

    return {
        "success": True,
        "filename": file.filename,
        "rows": len(df),
        "columns": len(df.columns),
        "total_missing_values": total_missing,
        "database_table": "sales_data",
        "column_details": column_details
    }