import React, { useState } from "react";

const CreateColumnForm = (props) => {
    const [columnName, setColumnName] = useState("");

    return (
        <div>
            <form>
                <label>
                    Column Name:
                    <input type="text" name="columnName" value={columnName} onChange={(e) => setColumnName(e.target.value)} />
                </label>
                <input type="submit" value="Create Column" />
            </form>
        </div>
    );
}

export default CreateColumnForm;