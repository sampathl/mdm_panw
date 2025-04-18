from flask import Blueprint, jsonify, current_app
import json
from pathlib import Path

api = Blueprint("api", __name__, url_prefix="/api/v1")

# GET /api/v1/debt  → returns the static JSON array
@api.route("/debt", methods=["GET"])
def get_mock_debt():
    """
    Temporary endpoint for early UI work.
    Reads backend/app/mock/world_debt_sample.json and returns it verbatim.
    """
    data_path = (
        Path(current_app.root_path)
        / "mock"
        / "world_debt_sample.json"
    )
    with open(data_path, "r", encoding="utf-8") as fp:
        debt_rows = json.load(fp)
    return jsonify(debt_rows), 200