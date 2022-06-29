import React from "react";

// create a user login component
const NewTableForm = (props) => {
    return (
        <div>
        <form>
            <label>
            Table Name:
            <input type="text" name="tableName" />
            </label>
            <input type="submit" value="Create Table" />
        </form>
        </div>
    );
    }

export default NewTableForm;

// create a 