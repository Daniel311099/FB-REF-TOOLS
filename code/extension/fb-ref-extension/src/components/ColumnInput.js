import React from "react";

function ColumnInput(props) {
    // const [columnName, setColumnName] = useState("");
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
            <select name={props.name} >
                {tableOptions(props.tables)}
            </select>
        </section>
    );
}


export default ColumnInput;