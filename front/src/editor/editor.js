import React from "react"

function EditorComponent(props) {
    //const notes = Object.values(props.notes)
    //var selectedNote = props.selectedNote

    return (
        <div className="editorContainer">{props.notes[props.selectedNote - 1].body}</div>
    )
}

export default EditorComponent
