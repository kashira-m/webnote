import React, { useState, useEffect } from "react"
import EditorComponent from "./editor/editor"
import SidebarComponent from "./sidebar/sidebar"
import request from "superagent"
function App() {
    const [note, setNote] = useState({
        noteid: 0,
        title: '',
        body: "",
        updateAt: ""
    })

    var [selectedNote, setselectedNote] = useState(1)
    //
    useEffect(() =>
            request
            .get('http://localhost:5000/getnote')
            .query(`noteid=${selectedNote}`)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    setNote('Sorry error occured')
                }
                else {
                    console.log(typeof(res.body),res.body)
                    setNote(res.body)
                    console.log(note)
                }
            }), [selectedNote])
    return (
        <div className="app-container">
            <SidebarComponent
                selectedNote={selectedNote}
                selectednoteSetter={setselectedNote}
            ></SidebarComponent>
            <EditorComponent
                note={note}
                setNote={setNote}
                selectedNote={selectedNote}
            ></EditorComponent>
        </div>
    )
}

function getnote(noteid) {
    request
        .get('http://localhost:5000/getnote')
        .query(`noteid=${noteid}`)
        .then(res => {
                console.log(res.body)
                return res.body
        })
        .catch(err => {
            console.log(err)
        })
}

function getTitle(userid) {
    request
    .get('http://localhost:5000/gettitles')
    .query(`userid=${userid}`)
    .then(res => {
        console.log(res.body)
        return res.body
    })
    .catch(err => {
        console.log(err)
        return
    })
}

export default App
