import React, { useState } from "react";
import { ShadowRoot } from "../ShadowRoot"; 

const ColumnSelector = (props) => {
    const [selected, setSelected] = useState(false)
    const clickHandler = (e) => {
        setSelected(selected => !selected)
        props.updateColumns({
            add: selected,
            column: {
                table: props.table,
                column: props.column
            }
        })
    }
    return (
        // <ShadowRoot>
            <input value={selected} type="checkbox" onChange={clickHandler}></input>
        // </ShadowRoot>
    )
}

export default ColumnSelector

