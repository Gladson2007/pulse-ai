import re


FORBIDDEN_KEYWORDS = [
    "insert",
    "update",
    "delete",
    "drop",
    "alter",
    "truncate",
    "create",
    "grant",
    "revoke",
]


def validate_sql(query: str):

    query = query.strip()

    if not query:
        return False, "SQL query is empty."

    normalized = query.lower()

    # Only SELECT queries are allowed
    if not normalized.startswith("select"):
        return False, "Only SELECT queries are allowed."

    # Block dangerous SQL commands
    for keyword in FORBIDDEN_KEYWORDS:
        pattern = rf"\b{keyword}\b"

        if re.search(pattern, normalized):
            return False, f"Blocked SQL keyword: {keyword}"

    # Allow only the PULSE AI table
    if "sales_data" not in normalized:
        return False, "Query must use the sales_data table."

    return True, "SQL query is safe."