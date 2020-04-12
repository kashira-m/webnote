from flask import Flask, render_template, redirect

app = Flask(__name__, static_folder="./static", template_folder="./templates")

@app.route('/')
def hello():
    return redirect('/index')

@app.route('/index')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(use_reloader=False)