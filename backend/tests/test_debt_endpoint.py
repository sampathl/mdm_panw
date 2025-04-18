"""
Integration tests for the mock debt endpoint.

"""
import json
from pathlib import Path

import pytest
from backend.app import create_app


@pytest.fixture(scope="module")
def client():
    """
    Yields a Flask test client backed by the same app factory.
    Using `scope="module"` means one app per test file = faster suite.
    """
    app = create_app()
    app.config.update(TESTING=True)
    with app.test_client() as c:
        yield c


def test_status_code_ok(client):
    """Endpoint should return HTTP 200."""
    resp = client.get("/api/v1/debt")
    assert resp.status_code == 200


def test_returns_list_of_objects(client):
    """Body should be a non‑empty JSON array of dicts."""
    data = client.get("/api/v1/debt").get_json()
    assert isinstance(data, list) and data, "Expected non‑empty list"
    assert isinstance(data[0], dict), "Rows should be objects"


def test_expected_keys_present(client):
    """Each object should contain the core debt keys."""
    data = client.get("/api/v1/debt").get_json()
    first = data[0]
    for key in (
        "country_code",
        "country_name",
        "year",
        "debt_type",
        "usd_millions",
    ):
        assert key in first, f"Missing key: {key}"


def test_data_matches_fixture_file(client):
    """
    Optional: compare endpoint output to the static JSON on disk.
    Guards against accidental mutations of the mock payload.
    """
    resp_data = client.get("/api/v1/debt").get_json()

    fixture_path = (
        Path(__file__).parent.parent
        / "app"
        / "mock"
        / "world_debt_sample.json"
    )
    disk_data = json.loads(Path(fixture_path).read_text(encoding="utf-8"))

    assert resp_data == disk_data