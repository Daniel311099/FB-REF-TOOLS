import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { Dispatch } from 'react'
import { Dispatch, AnyAction } from 'redux'
import {useSelector, useDispatch} from 'react-redux'

interface CustomTablesSliceState {
    id: string
    name: string
    subjectType: string
}

const initialColumn: CustomTablesSliceState = {
    id: '',
    name: '',
    subjectType: '',
}

const columnSlice = createSlice({
    name: 'column',
    initialState: initialColumn,
    reducers: {
        setTableName: (state: CustomTablesSliceState, action: PayloadAction<string>) => {
            state.name = action.payload
        }
    }
})

export default columnSlice.reducer

const { setTableName } = columnSlice.actions

export function setTableNameAction(column: string): AnyAction {
    return setTableName(column)
}