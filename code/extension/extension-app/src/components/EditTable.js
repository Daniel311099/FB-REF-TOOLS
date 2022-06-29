import React from "react";
import { addStyles, StaticMathField } from "react-mathquill";
addStyles()


export default function EditTable(props) {
    const columns = props.columns;
    const colExps = columns.map(col => {
        return (
            <li>
                <h1>{col.name}</h1>
                <StaticMathField latex={col.expression} />
            </li>
        )
    });
    return (
        <div>
            <ul>
                {colExps}
            </ul>
        </div>
    );
}