import sqlite3
import json

def connect():
    conn = sqlite3.connect('notes.db')
    c = conn.cursor()
    return (conn, c)
    
def makeUserTable(cursor, userid) :
    create_table = 'create table if not exists notes%s (noteid integer primary key, title text, body text, updateAt integer)' % userid
    cursor.execute(create_table)
    return

# return note data
def getNote(cursor, userid, noteid):
    get_note_sql = 'select * from notes%s where noteid = %s' % (userid, noteid)
    cursor.execute(get_note_sql)
    result = cursor.fetchall()
    return result

def getTitles(cursor, userid):
    get_note_title_sql = 'select noteid, title from notes%s' % userid
    cursor.execute(get_note_title_sql)
    result = cursor.fetchall()
    print(result)
    return result

# get new note data and rewrite db
def writeNotes(conn, cursor, userid, noteid, title, body, updateAt):

    if noteid == "non":
        # create new note
        try:
            write_note_sql = 'insert into notes%s (title, body, updateAt) values (?, ?, ?)' % userid
            cursor.execute(write_note_sql, (title, body, updateAt))
            conn.commit()
            conn.close()

            return "success"
        except sqlite3.Error as e:
            return e
    else:
        # rewrite db
        try:
            write_note_sql = 'update notes%s set title=?, body=?, updateAt=? where noteid = %d' % (userid, int(noteid))
            cursor.execute(write_note_sql, (title, str(body), updateAt))
            conn.commit()
            conn.close()

            return "success"
        except sqlite3.Error as e:
            return e


def deleteNote(conn, cursor, userid, noteid):

    delete_note_sql = "delete from notes%s where noteid = %d" % (userid, int(noteid))
    try:
        cursor.execute(delete_note_sql)
        conn.commit()
        conn.close()
        return "success"
    except sqlite3.Error as e:
        return e
    