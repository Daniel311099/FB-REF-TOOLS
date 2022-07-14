import React, {useState} from "react";

const CreateTableForm = (props) => {
    const [tableName, setTableName] = useState("");

    return (
        <div>
            <form>
                <label>
                    Table Name:
                    <input type="text" name="tableName" value={tableName} onChange={(e) => setTableName(e.target.value)} />
                </label> <br />
                <input type="submit" value="Create Table" />
            </form>
        </div>
    );
}

export default CreateTableForm;