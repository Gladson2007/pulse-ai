def detect_chart_type(rows):
    if not rows:
        return "table"

    first_row = rows[0]

    columns = list(first_row.keys())

    # Two columns usually work well for a bar chart
    if len(columns) == 2:
        return "bar"

    # One numeric result is ideal for a KPI
    if len(columns) == 1:
        return "kpi"

    return "table"