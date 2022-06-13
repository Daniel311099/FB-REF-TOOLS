import React, { ChangeEvent, useState } from "react";

interface NewNoteInputProps {
    addNote(note:string): void
}

export const NewNoteInput: React.FC<NewNoteInputProps> = ({addNote}) => {
    const [note, setNote] = useState("")

    const updateNote = (event:ChangeEvent<HTMLInputElement>) => {
        setNote(event.target.value)
    }

    const onAddNoteClick = () => {
        // console.log(addNote)
        addNote(note)
        setNote("")
    }

    return (

        <div className="App">
          <input onChange={updateNote} value={note} type="text" name="note" placeholder="note" />
          <button onClick={onAddNoteClick}>Add Note!</button>
        </div>
    )
}