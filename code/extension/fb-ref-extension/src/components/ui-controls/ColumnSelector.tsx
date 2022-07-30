import React, { useState } from "react";
import { ShadowRoot } from "../on-page/ShadowRoot"; 
import { createStandardColumnAction } from "../../store/customColumnsSlice";

const ColumnSelector = (props: any) => {
    const [selected, setSelected] = useState(false)
    const clickHandler = (e: any) => {
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
            <input checked={selected} type="checkbox" onChange={clickHandler}></input>
        // </ShadowRoot>
    )
}

export default ColumnSelector

