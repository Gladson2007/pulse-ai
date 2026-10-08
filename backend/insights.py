def generate_basic_insight(rows):

    if not rows:
        return "No data was returned from the analysis."

    first_row = rows[0]

    # Look for common numeric columns
    numeric_columns = []

    for key, value in first_row.items():

        if isinstance(value, (int, float)):
            numeric_columns.append(key)

    if not numeric_columns:
        return "The analysis returned data, but no numeric metric was found."

    metric = numeric_columns[0]

    values = []

    for row in rows:

        value = row.get(metric)

        if isinstance(value, (int, float)):
            values.append(value)

    if not values:
        return "There is not enough numeric data to generate an insight."

    highest = max(values)
    lowest = min(values)

    return (
        f"The highest {metric} value is "
        f"{highest:,.2f}, while the lowest is "
        f"{lowest:,.2f}."
    )