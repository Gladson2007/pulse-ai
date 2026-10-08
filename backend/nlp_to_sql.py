import re


def generate_sql(question: str):

    question = question.lower().strip()

    # Total sales
    if "total sales" in question:

        region_match = re.search(
            r"in\s+([a-zA-Z ]+)",
            question
        )

        if region_match:
            region = region_match.group(1).strip().title()

            return f"""
SELECT SUM(sales) AS total_sales
FROM sales_data
WHERE region = '{region}';
""".strip()

        return """
SELECT SUM(sales) AS total_sales
FROM sales_data;
""".strip()

    # Total profit
    if "total profit" in question:

        return """
SELECT SUM(profit) AS total_profit
FROM sales_data;
""".strip()

    # Number of orders
    if "number of orders" in question:

        return """
SELECT COUNT(*) AS total_orders
FROM sales_data;
""".strip()

    return None