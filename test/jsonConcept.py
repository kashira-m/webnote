"""
server -> client
{
    "userid" : "0414",
    "titleList": [
        {
            "noteid": 0,
            "title": "Hello world"
        },
        {
            "noteid": 1,
            "title": "Hello Again"
        }
    ]
}

{
    "noteid": 0,
    "title": "Hello world",
    "body" : "YEAH hello world ~~~...",
    "apdateAt": "2020/0414/1234"
}

client -> server
req notebody
{
    "userid": 0414,
    "noteid": 0
}
reqnote title list
{
    "userid": 0414
}

req new note id
{
    "userid": 0414
    "title" : "Hello world again and again"
}
"""