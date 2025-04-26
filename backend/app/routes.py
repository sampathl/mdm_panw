from flask import Blueprint, jsonify, current_app
import json
from pathlib import Path
from app.services.bigquery_service import (
    fetch_country_summary,
    fetch_country_series,
    fetch_series_summary,
    fetch_international_debt_full,
)

api = Blueprint("api", __name__, url_prefix="/api/v1")

# GET /api/v1/debt  → returns the static JSON array
@api.route("/debt-mock", methods=["GET"])
def get_mock_debt():
    """
    Reads backend/app/mock/world_debt_sample.json and returns it.
    """
    data_path = (
        Path(current_app.root_path)
        / "mock"
        / "world_debt_sample.json"
    )
    with open(data_path, "r", encoding="utf-8") as fp:
        debt_rows = json.load(fp)
    return jsonify(debt_rows), 200

@api.route("/debt", methods=["GET"])
def get_debt():
    """
    Return live debt data from BigQuery (limited to 100 rows).
    """
    rows = get_debt_data(limit=100)
    return jsonify(rows), 200


api = Blueprint("api", __name__, url_prefix="/api/v1")

@api.route("/country_summary", methods=["GET"])
def country_summary():
    rows = fetch_country_summary()
    return jsonify(rows), 200

@api.route("/country_series", methods=["GET"])
def country_series():
    rows = fetch_country_series()
    return jsonify(rows), 200

@api.route("/series_summary", methods=["GET"])
def series_summary():
    rows = fetch_series_summary()
    return jsonify(rows), 200

@api.route("/international_debt", methods=["GET"])
def international_debt():
    rows = fetch_international_debt_full()
    return jsonify(rows), 200