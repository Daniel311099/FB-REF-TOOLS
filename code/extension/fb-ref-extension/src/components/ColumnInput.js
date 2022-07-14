import React from "react";

function ColumnInput(props) {
    const [columnName, setColumnName] = useState("");

    return (
        <section>
            <label>
                Column Name:
                <input
                    type="text"
                    name="columnName"
                    value={columnName}
                    onChange={(e) => setColumnName(e.target.value)}
                />
            </label>
            <input type="submit" value="Create Column" />
        </section>
    );
}
