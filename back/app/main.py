from flask import Flask, render_template, redirect, jsonify, request
import json
from models import database

app = Flask(__name__, static_folder="./static", template_folder="./templates")

@app.route('/')
def hello():
    return redirect('/index')

@app.route('/index')
def index():
    return render_template('index.html')

@app.route("/getnote")
def getnote():
    print("get note api was called")
    userid = 'mon'
    noteid = request.args.get('noteid')
    conn, cursor = database.connect()
    result = database.getNote(cursor, userid, noteid)
    conn.close()
    result = result[0]

    # 整形
    res = {
        "noteid":str(result[0]),
        "title": result[1],
        "body": result[2],
        "updateAt": result[3]
    }

    return jsonify(res)

@app.route("/gettitles")
def getTitles():
    print("get titles api was called")
    userid = request.args.get('userid')
    conn, cursor = database.connect()
    result = database.getTitles(cursor, userid)
    conn.close()
    '''
    {
        "userid": "abc",
        "titleList": [
            {
                "noteid": num,
                "title" : title
            },
            {
                "noteid": num,
            },
    }
    '''
    # dict list "titleList"

    titleList = []
    for i in range(len(result)):
        noteid = result[i][0]
        title = result[i][1]
        titleList.append({
            "noteid": noteid,
            "title": title
        })
    # 整形
    res = {
        "userid": userid,
        "titleList": titleList
    }
    print(type(titleList), titleList)
    print(jsonify(res))
    return jsonify(res)

@app.route('/makenote', methods=['POST'])
def makenote():
    if request.method == 'POST':
        print("POST request recepted")
        reqbody = request.get_json()
        print(reqbody)
        userid = reqbody["userid"]
        noteid = reqbody["noteid"]
        title = reqbody["title"]
        body = reqbody["body"]
        updateAt = reqbody["updateAt"]
        conn, cursor = database.connect()
        
        print(title)
        result = database.writeNotes(conn, cursor, userid, noteid, title, body, updateAt)

        if result == "success":
            return result
        else:
            print(result)
            return "error occured"
    else:
        print("request is not POST")

@app.route('/deletenote', methods=['POST'])
def deletenote():
    print('delete request recepted')
    reqbody = request.get_json()
    userid = reqbody["userid"]
    noteid = reqbody["noteid"]
    conn, cursor = database.connect()

    result = database.deleteNote(conn, cursor, userid, noteid)

    if result == "success":
        return result
    else:
        print(result)
        return "error occured"

if __name__ == '__main__':
    app.run(use_reloader=False)