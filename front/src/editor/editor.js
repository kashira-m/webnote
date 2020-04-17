import React, { useState, useEffect }from "react"
import ReactQuill from "react-quill"
import request from "superagent"
import 'react-quill/dist/quill.snow.css'

function EditorComponent(props) {
    //const notes = Object.values(props.notes)
    //var selectedNote = props.selectedNote

    const [note, setNote] = useState({
        noteid: 0,
        title: '',
        body: "",
        updateAt: ""
    })
    const [noteinfo, setNoteinfo] = useState({
        noteid: 0,
        title: '',
        body: "",
        updateAt: ""
    })
    useEffect(() =>
            request
            .get('http://localhost:5000/getnote')
            .query(`noteid=${props.selectedNote}`)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    setNote('Sorry error occured')
                }
                else {
                    console.log(note)
                    console.log(typeof(res.body),res.body)
                    setNote(res.body.body)
                    setNoteinfo(res.body)
                    console.log(note)
                }
            }), [props.selectedNote])

    return (
        <div className="editorContainer">
        <ReactQuill className="quill" theme="snow" value={note} onChange={setNote}></ReactQuill>
        <button className="savebutton" onClick={(e) => rewriteNote(e, noteinfo, note)}>SAVE</button>
        </div>
    )
}

function rewriteNote(e, noteinfo, note) {
    let d = new Date()
    let datestr = d.toString()
    console.log(noteinfo.noteid)
    request
        .post('http://localhost:5000/makenote')
        .send({userid:"mon", noteid: noteinfo.noteid, title:noteinfo.title, body:note, updateAt: datestr})
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    return
}

export default EditorComponent
