import React, { useState } from "react"

export default function Notelist(props) {
    const Notelist = Object.values(props.notes)

    const lines = Notelist.map((e) => {
        return <div key={e._id} onClick={() => props.noteSetter(e._id - 1)}>{e.title}</div>
    })

    return <div>{lines}</div>
}
