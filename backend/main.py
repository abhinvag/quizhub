from flask import Flask, jsonify, request
import firebase_admin
from firebase_admin import credentials, firestore
from flask_cors import CORS

cred = credentials.Certificate("key.json")
firebase_admin.initialize_app(cred)


app = Flask(__name__)
CORS(app)
db = firestore.client()


@app.route("/")
def home():
    return "<h1>Server is LIVE.</h1>"


@app.route("/users", methods=["GET"])
def get_user():
    try:
        docs = db.collection("users").stream()
        user_data = {}

        for doc in docs:
            user_data[doc.id] = doc.to_dict()
        user_data["success"] = True
        response = jsonify(user_data)
        response.status_code = 200
        return response

    except Exception as e:
        response = {
            "Success": False,
            "Error": str(e)
        }
        return response
