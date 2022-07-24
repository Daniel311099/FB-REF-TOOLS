import React, {useState} from "react";

function ColumnInput(props) {
    const [selected, setSelected] = useState({});
    const setPlaceholders = props.setPlaceholders;
    const active = props.active;


    let columnOptions = columns => {
        let options = columns.map(col => {
            return (
                <option value={col.name}>{col.name}</option>
            )
        })
        return options;
    }

    let tableOptions = tables => {
        let options = Object.keys(tables).map(table => {
            return (
                <optgroup label={table}>
                    {columnOptions(tables[table])}
                </optgroup>
            )
        })
        return options;
    }

    return (
        <section>
            <label for={props.name}>{props.name}:</label>
            <select name={props.name} onChange={
                (e) => {
                    props.updatePlaceholder(props.name, e.target.value);
                    console.log(e.target.value);
                }
            } >
                {tableOptions(props.tables)}
            </select>
        </section>
    );
}


export default ColumnInput;