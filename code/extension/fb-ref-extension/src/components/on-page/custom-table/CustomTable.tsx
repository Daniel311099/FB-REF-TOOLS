import React, { useState } from "react";
import {useSelector, useDispatch, TypedUseSelectorHook} from "react-redux";
import { addColumn, CustomColumn, createStandardColumnAction } from "../../../store/customColumnsSlice";
import { DataSliceState, pageColumn, PageTable } from "../../../store/dataSlice";

import { CustomColumnType, useNewQQuery} from "../../../generated/graphql";

import CustomExp from "./CustomExp"
import { useTypedSelector } from "../../../store/store";

function CustomTable() {
    const [active, setActive] = useState('')

    const tables = useTypedSelector((state) => state.pageTables).tables
    const columns = (tables[0] ? tables[0].columns : [])
    const dispatch = useDispatch()

    // console.log(columns)

    return (
        <div className="custom-table">
            <ol>
                <h3>Standard Columns</h3>
                {columns.map((column:any, index:number) => {
                    return (
                        <li key={index}>
                            <CustomExp column={column.latex} />
                        </li>
                    )
                })}
                <NewStandardColumn />
            </ol>
        </div>
    )
}

const NewStandardColumn = (props: any) => {
    const [table, setTable] = useState('')
    const [column, setColumn] = useState('')

    const dispatch = useDispatch()
    const pageTables: DataSliceState= useSelector((state: any) => state.pageTables)
    console.log(pageTables, 'ns')
    let columnOptions = (columns: pageColumn[]) => {
        console.log(columns, 'columns')
        let options = columns.map(col => {
            return (
                <option value={JSON.stringify(col)}>{col.name}</option>
            )
        })
        return options;
    }

    const handleSubmit = async (e: any) => {
        // const postColumn = await fetch("http://localhost:8080/custom_standard_column", {
        //     method: "POST",
        //     body: column,
        // })
        // const newColumn: CustomColumn = await postColumn.json()
        const {data, error, isLoading, isError} = useNewQQuery({customTableId: 2})
        if (!data?.compileStandardTableColumn) {return 'error'}
        const newColumn:CustomColumn | undefined = data?.compileStandardTableColumn
        dispatch(createStandardColumnAction(newColumn))
    }

    return (
        <li>
            <form onSubmit={handleSubmit} >
                <label htmlFor="new column">Name</label>
                <select placeholder="new column" name="new column" onChange={(e) => {setColumn(e.target.value)}}>
                    {pageTables.tables.map((table, index:number) => {
                        return (
                            <optgroup label={table.name}>
                                {columnOptions(table.columns)}
                            </optgroup>
                        )
                    })}
                </select>
                <button type="submit">Add</button>
            </form>
        </li>
    )
}

export default CustomTable;
