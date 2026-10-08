import os

from dotenv import load_dotenv
from openai import OpenAI

from schema import DATABASE_SCHEMA

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def generate_sql_with_ai(question: str):

    prompt = f"""
You are PULSE AI, an expert PostgreSQL data analyst.

Database schema:

{DATABASE_SCHEMA}

User question:

{question}

Generate one PostgreSQL SELECT query that answers
the user's question.

Rules:
1. Only generate SELECT queries.
2. Use only the provided table and columns.
3. Never generate INSERT, UPDATE, DELETE, DROP, ALTER, or CREATE.
4. Do not explain the query.
5. Return only SQL.
"""

    response = client.responses.create(
        model="gpt-5.6-mini",
        input=prompt
    )

    return response.output_text.strip()