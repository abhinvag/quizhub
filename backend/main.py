from flask import Flask, request
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("key.json")
firebase_admin.initialize_app(cred)


app = Flask(__name__)
db = firestore.client()


@app.route("/")
def home():
    return "<h1>Server is LIVE.</h1>"
