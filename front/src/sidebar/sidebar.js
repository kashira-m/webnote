import React, { useState } from "react"
import Notelist from "../notelist/notelist"
import request from "superagent"

function SidebarComponent(props) {
    const [showInput, setShow] = useState(false)
    
    const [newtitle, setNewtitle] = useState('')

    const [requireReload, setrequireReload] = useState(true)

    return (
        <div className="sidebarContainer">
            <div className="createNewNote" onClick={() => setShow(true)}>
                <p>Create New Note</p>
            </div>
            <div>
                {showInput ?
                    <div>
                        <input type="text" value={newtitle} onChange={(e) => setNewtitle(e.target.value)}></input>
                        <button onClick={() => makeNote(setShow, newtitle ,setNewtitle, setrequireReload)}>OK</button>
                    </div>
                    : null}
            </div>
            <Notelist
                selectedNote = {props.selectedNote}
                selectednoteSetter={props.selectednoteSetter}
                requireReload = {requireReload}
                setrequireReload = {setrequireReload}
            ></Notelist>
        </div>
    )
}

function makeNote(setShow, newtitle, setNewtitle, setrequireReload) {
    setShow(!setShow)
    console.log(newtitle)
    // userid, noteid, title, body, updateAt
    let d = new Date()
    let datestr = d.toString()
    request
        .post('http://localhost:5000/makenote')
        .send({userid:"mon", noteid: "non", title: newtitle, body: 'newNote', updateAt: datestr})
        .then(res => {
            console.log(res.body)
            setrequireReload(true)
        })
        .catch(err => {
            console.log(err)
        })
        .then(() => {
            setNewtitle('')
        })

    return
}

export default SidebarComponent
