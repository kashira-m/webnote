import sqlite3
import json


conn = sqlite3.connect('notes.db')
c = conn.cursor()

def makeUserTable(cursor, userid) :
    create_table = 'create table if not exists notes%s (id integer primary key, title text, body text, updateAt integer)' % userid
    cursor.execute(create_table)
    return c

# return note data
def getNotes(cursor, userid):
    get_note_sql = 'select * from notes%s' % userid
    cursor.execute(get_note_sql)
    result = cursor.fetchall()
    return result

# get new note data and rewrite db
def writeNotes(cursor, userid, newNotes, noteid):
    # make new note if not exists
    confirm_sql = 'select id from notes%s where id = %d' % (userid, noteid)
    cursor.execute(confirm_sql)
    result = cursor.fetchall()

    if result:
        # rewrite db
        pass
    else:
        #create new note
        write_note_sql = 'insert into notes%s (title, body, updateAt)' % userid