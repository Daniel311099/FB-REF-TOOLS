import React, {useState} from "react";
import { addStyles, EditableMathField } from "react-mathquill";
addStyles()

export default function EditColumn(props) {
    return (
        <div>
            <EditableMathExample />
        </div>
    );
}

const URL = 'http://localhost:8000/custom_tables/tables'

export const EditableMathExample = () => {
    const [latex, setLatex] = useState('\\frac{1}{\\sqrt{2}}\\cdot 2')

    const sendCol = async () => {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            // sameSite: 'none',
            body: {name: 'test', latex: latex, description: 'test description'}
        })
        const content = await response.json()
        console.log(content)
    }

    return (
        <div>
            <EditableMathField
                latex={latex}
                onChange={(mathField) => {
                    setLatex(mathField.latex())
                }}
            />
            <p>{latex}</p>
            <button onClick={sendCol}>save</button>
        </div>
    )
}