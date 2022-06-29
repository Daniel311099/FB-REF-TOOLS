import React from "react";

function Tables(props) {
    const tables = props.tables
    
    const listTables = tables.map((table) => {
        return (
            <li key={table.name}>
                {table.name}
            </li>
        )
    })
    
    return (
        <ul>
            {listTables}
        </ul>
    );
}

export default Tables;