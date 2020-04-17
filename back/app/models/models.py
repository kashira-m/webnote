import sqlite3
import json

dbname = "notes.db"

conn = sqlite3.connect(dbname)
c = conn.cursor()

# SQL
create_tabel = 'create table if not exists monnotes (id integer primary key, title text, body text, updateAt text)'
c.execute(create_tabel)

sql = "insert into monnotes (title, body, updateAt) values (?, ?, ?)"
valuelist = ("Im monji", "Hello from JPN", "202003192223")
c.execute(sql, valuelist)

conn.commit()

select_sql = "select id from monnotes where id = 2"

c.execute(select_sql)
result = c.fetchall()

conn.close()
print(bool(result))
