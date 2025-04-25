from google.cloud import bigquery
from pathlib import Path
import os

PROJECT_ID = "bigquery-public-data"
DATASET = "world_bank_intl_debt"
TABLE = "country_summary"

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
          country_name,
          country_code,
          year,
          debt_type,
          usd_debt AS usd_millions
        FROM `{PROJECT_ID}.{DATASET}.{TABLE}`
        WHERE usd_debt IS NOT NULL
        ORDER BY year DESC
        LIMIT {limit}
    """

    query_job = client.query(query)
    results = query_job.result()

    rows = [dict(row) for row in results]
    return rows