from google.cloud import bigquery
from pathlib import Path
import os

PROJECT_ID = "bigquery-public-data"
DATASET = "world_bank_intl_debt"
TABLE = "international_debt"

#change for Deployed service
CREDENTIALS_FILE = Path(os.getenv("BIGQUERY_CREDENTIALS", "../../credentials/bigquery-key.json"))

client = bigquery.Client.from_service_account_json(str(CREDENTIALS_FILE))

def get_debt_data(limit=100):
    """
    Query the public World Bank debt data table from BigQuery.
    Returns a list of dict rows (JSON serializable).
    """
    query = f"""
        SELECT
          *
        FROM `{PROJECT_ID}.{DATASET}.{TABLE}`
        WHERE value IS NOT NULL
        ORDER BY year DESC
        LIMIT {limit}
    """

    query_job = client.query(query)
    results = query_job.result()

    rows = [dict(row) for row in results]
    return rows

def fetch_country_summary():
    query = """
        SELECT
          country_code, short_name, table_name, long_name, two_alpha_code, region, income_group
        FROM `bigquery-public-data.world_bank_intl_debt.country_summary`
        WHERE country_code IS NOT NULL
        ORDER BY short_name
    """
    return [dict(row) for row in client.query(query).result()]

def fetch_country_series():
    query = """
        SELECT country_code, series_code, description
        FROM `bigquery-public-data.world_bank_intl_debt.country_series_definitions`
        WHERE country_code IS NOT NULL
        ORDER BY country_code
    """
    return [dict(row) for row in client.query(query).result()]


def fetch_series_summary():
    query = """
        SELECT series_code, topic, indicator_name, short_definition, unit_of_measure, aggregation_method
        FROM `bigquery-public-data.world_bank_intl_debt.series_summary`
        WHERE series_code IS NOT NULL
        ORDER BY topic
    """
    return [dict(row) for row in client.query(query).result()]

def fetch_international_debt_full():
    query = """
        SELECT country_name, country_code, indicator_name, indicator_code, value, year
        FROM `bigquery-public-data.world_bank_intl_debt.international_debt`
        WHERE value IS NOT NULL
        ORDER BY year DESC
        LIMIT 10000
    """
    return [dict(row) for row in client.query(query).result()]

def fetch_international_debt_dynamic(filters):
    where_clauses = ["value IS NOT NULL"]
    params = {}

    if "year" in filters:
        where_clauses.append("year = @year")
        params["year"] = int(filters["year"])

    if "country" in filters:
        where_clauses.append("country_code = @country")
        params["country"] = filters["country"]

    if "indicator" in filters:
        where_clauses.append("indicator_code = @indicator")
        params["indicator"] = filters["indicator"]

    where_statement = " AND ".join(where_clauses)

    query = f"""
        SELECT country_name, country_code, indicator_name, indicator_code, value, year
        FROM `bigquery-public-data.world_bank_intl_debt.international_debt`
        WHERE {where_statement}
        ORDER BY year DESC
        LIMIT 1000
    """

    job_config = bigquery.QueryJobConfig(
        query_parameters=[
            bigquery.ScalarQueryParameter("year", "INT64", params.get("year")) if "year" in params else None,
            bigquery.ScalarQueryParameter("country", "STRING", params.get("country")) if "country" in params else None,
            bigquery.ScalarQueryParameter("indicator", "STRING", params.get("indicator")) if "indicator" in params else None,
        ]
    )

    query_job = client.query(query, job_config=job_config)
    results = query_job.result()

    return [dict(row) for row in results]