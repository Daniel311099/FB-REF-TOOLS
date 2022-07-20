import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { Dispatch } from 'react'
import { Dispatch, AnyAction } from 'redux'

interface ColumnSliceState {
    column: string
}

const initialColumn: ColumnSliceState = {
    column: '',
}

const columnSlice = createSlice({
    name: 'column',
    initialState: initialColumn,
    reducers: {
        setColumn: (state: ColumnSliceState, action: PayloadAction<string>) => {
            state.column = action.payload
        }
    }
})

export default columnSlice.reducer

const { setColumn } = columnSlice.actions

export function setColumnAction(column: string): AnyAction {
    return setColumn(column)
}