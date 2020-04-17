import React, { useState, useEffect } from "react"
import request from "superagent"


export default function Notelist(props) {
    
    let [titleList, settitleList] = useState(null)
    let [lines, setLines] = useState(null)

    
    useEffect(() => {
        request
            .get('http://localhost:5000/gettitles')
            .query(`userid=mon`)
            .then(res => {
                settitleList(res.body)
                props.setrequireReload('false')
            })
            .catch(err => {
                console.log(err)
            })
    }, [props.requireReload])

    useEffect(() => {
        if (Boolean(titleList)) {
            let titlelist = Object.values(titleList.titleList)
            setLines( titlelist.map((e) => {
                return <div key={e.noteid} onClick={() => props.selectednoteSetter(e.noteid)}>
                        {e.title}<button onClick={(e) => deleteNote(e, props.selectedNote, props.selectednoteSetter,props.setrequireReload)}>delete</button>
                        </div>
            }))}
        return () => console.log("lines are made")
    }, [titleList])

    return <div>{lines}</div>
}

function deleteNote(e, selectedNote, setselectedNote,setrequireReload) {
    request
        .post('http://localhost:5000/deletenote')
        .send({userid: "mon", noteid: selectedNote})
        .then(res => {
            console.log(res.body)
            setrequireReload(true)

            setselectedNote()
            
        })
        .catch(err => {
            console.log(err)
        })
        
    return

}
