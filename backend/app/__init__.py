import logging
import traceback
from flask import Flask, jsonify
from flask_cors import CORS
from .routes import api

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": '*'}})
    app.register_blueprint(api)
    if not app.debug:
        # In production mode, log errors
        logging.basicConfig(level=logging.INFO)

    # Catch 404 errors (Not Found)
    @app.errorhandler(404)
    def handle_404(e):
        app.logger.warning(f"404 Error: {e}")
        return jsonify(error="Not Found", description=str(e)), 404

    # Catch 500 errors (Internal Server Error)
    @app.errorhandler(500)
    def handle_500(e):
        tb = traceback.format_exc()
        app.logger.error(f"500 Error: {e}\nTraceback:\n{tb}")
        return jsonify(error="Internal Server Error", description=str(e)), 500

    # Catch all uncaught exceptions
    @app.errorhandler(Exception)
    def handle_exception(e):
        tb = traceback.format_exc()
        app.logger.error(f"Exception: {e}\nTraceback:\n{tb}")
        return jsonify(error="Unhandled Exception", description=str(e)), 500

    return app