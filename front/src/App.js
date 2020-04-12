import React, { useState } from "react"
import EditorComponent from "./editor/editor"
import SidebarComponent from "./sidebar/sidebar"

function App() {
    const [note, setNotes] = useState({
        1: {
            _id: 1,
            title: "Hello world",
            body: "HEHEHE",
            updataAt: new Date(),
        },
        2: {
            _id: 2,
            title: "hello again",
            body: "YEAH Hello World",
            updateAt: new Date(),
        },
    })

    var [selectedNote, setselectedNote] = useState(0)

    return (
        <div className="app-container">
            <SidebarComponent
                notes={note}
                selectedNote={selectedNote}
                noteSetter={setselectedNote}
            ></SidebarComponent>
            <EditorComponent
                notes={note}
                selectedNote={selectedNote}
            ></EditorComponent>
        </div>
    )
}

export default App
