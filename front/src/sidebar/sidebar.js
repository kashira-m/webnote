import React, { useState } from "react"
import Notelist from "../notelist/notelist"

function SidebarComponent(props) {
    return (
        <div className="sidebarContainer">
            <div className="createNewNote">
                <p>Create New Note</p>
            </div>
            <Notelist
                notes={props.notes}
                noteSetter={props.noteSetter}
            ></Notelist>
        </div>
    )
}

function titleClicked(e) {
    console.log(e)
    console.log(e.content)
}

export default SidebarComponent
