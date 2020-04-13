import React, { useState } from "react"
import Notelist from "../notelist/notelist"

function SidebarComponent(props) {
    const [showInput, setShow] = useState(false)
    console.log(typeof props.notes)

    return (
        <div className="sidebarContainer">
            <div className="createNewNote" onClick={() => setShow(true)}>
                <p>Create New Note</p>
            </div>
            <div>
                {showInput ?
                    <div>
                        <input type="text"></input>
                        <button onClick={(e) => makeNote(e, setShow, props.notes)}>OK</button>
                    </div>
                    : null}
            </div>
            <Notelist
                notes={props.notes}
                noteSetter={props.noteSetter}
            ></Notelist>
        </div>
    )
}

function makeNote(e, setShow, notes) {
    console.log("created new note clicked")
    notes[3].title = "YEAHHH"
    setShow(false)
}

export default SidebarComponent
