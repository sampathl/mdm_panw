from google.cloud import bigquery
from pathlib import Path
import os
import logging

PROJECT_ID = "bigquery-public-data"
DATASET = "world_bank_intl_debt"
TABLE = "international_debt"

logging.critical("Credentials being picked up")

#change for Deployed service
CREDENTIALS_FILE = Path( "/app/credentials/mdm-panw-457918-1dac1272e047.json")

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
    logging.critical("get_debt_data called")
    return rows

def fetch_country_summary():
    query = """
        SELECT
          country_code, short_name, table_name, long_name, two_alpha_code, region, income_group
        FROM `bigquery-public-data.world_bank_intl_debt.country_summary`
        WHERE country_code IS NOT NULL
        ORDER BY short_name
    """
    logging.critical("get_debt_data called")
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
    query_parameters = []

    if filters.get("year"):
        where_clauses.append("year = @year")
        query_parameters.append(
            bigquery.ScalarQueryParameter("year", "INT64", int(filters["year"]))
        )

    if filters.get("country"):
        where_clauses.append("country_name = @country")
        query_parameters.append(
            bigquery.ScalarQueryParameter("country", "STRING", filters["country"])
        )

    if filters.get("indicator"):
        where_clauses.append("indicator_code = @indicator")
        query_parameters.append(
            bigquery.ScalarQueryParameter("indicator", "STRING", filters["indicator"])
        )

    # Build the final WHERE statement
    where_statement = " AND ".join(where_clauses)

    # Final Query String
    query = f"""
        SELECT country_name, country_code, indicator_name, indicator_code, value, year
        FROM `bigquery-public-data.world_bank_intl_debt.international_debt`
        WHERE {where_statement}
        ORDER BY year DESC
        LIMIT 1000
    """

    # Setup Job Config
    job_config = bigquery.QueryJobConfig(
        query_parameters=query_parameters
    )

    # Debugging
    print("Final Query String:\n", query)
    print("Final Query Parameters:\n", query_parameters)

    # Execute
    query_job = client.query(query, job_config=job_config)
    results = query_job.result()
    data=[dict(row) for row in results]
    return data