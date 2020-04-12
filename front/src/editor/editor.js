import React from "react"

function EditorComponent(props) {
    const notes = Object.values(props.notes)
    //var selectedNote = props.selectedNote

    return (
        <div className="editorContainer">{notes[props.selectedNote].body}</div>
    )
}

export default EditorComponent
