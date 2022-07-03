import React, {useState} from "react";
import { addStyles, EditableMathField, StaticMathField } from "react-mathquill";
addStyles()

export default function EditColumn(props) {
    return (
        <div>
            <EditableMathExample />
        </div>
    );
}

const URL = 'http://localhost:8000/custom_tables/column'

export const EditableMathExample = () => {
    const [latex, setLatex] = useState('\\frac{1}{\\sqrt{2}}\\cdot 2')
    const [exps, setExps] = useState([])

    const expList = exps.map(exp => {
        return (
            <li key={exp.column_id}>
                <StaticMathField latex={exp.data}>{exp.data}</StaticMathField>
            </li>
        )
    })

    const sendCol = async () => {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            // sameSite: 'none',
            body: JSON.stringify({name: 'test', latex: latex, description: 'test description'})
        })
        const content = await response.json()
        console.log(content)
        setExps([...exps, content])
    }
    console.log(exps)

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
            <ul>
                {expList}
            </ul>
        </div>
    )
}