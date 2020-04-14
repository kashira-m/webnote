from flask import Flask, render_template, redirect, jsonify
import json

app = Flask(__name__, static_folder="./static", template_folder="./templates")

@app.route('/')
def hello():
    return redirect('/index')

@app.route('/index')
def index():
    return render_template('index.html')

@app.route("/getjson")
def getjson():
    return jsonify(
        {
            "_id": 1,
            "title": "Hello world",
            "body": "HEHEHE",
            "updataAt": 111111111,
        },
        {
            "_id": 2,
            "title": "hello again",
            "body": "YEAH Hello World",
            "updateAt": 222222222,
        },
    )

if __name__ == '__main__':
    app.run(use_reloader=False)