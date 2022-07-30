import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { Dispatch, AnyAction, ActionCreatorWithPayload } from 'redux'

export type CustomColumn = {
    id: number 
    exp: string,
    // custom_table: string,
    name: string,
    custom: boolean,
    customTableId: number,
}

type ExpActionType = {
    column_id: number
    new_exp: string
}

interface CustomColumnsSliceState {
    columns: CustomColumn[]
}

const initialColumn: CustomColumnsSliceState = {
    columns: [],
}   

const customColumnsSlice = createSlice({
    name: 'column',
    initialState: initialColumn,
    reducers: {
        setExp: (state: CustomColumnsSliceState, action: PayloadAction<ExpActionType>) => {
            let column = state.columns.find(el => el.id == action.payload.column_id)
            if (!column) {return state}
            column.exp = action.payload.new_exp
            return state
        },
        // setCustomTable: (state: CustomColumnSliceState, action: PayloadAction<string>) => {
        //     state.custom_table = action.payload
        // },
        // setName: (state: CustomColumnsSliceState, action: PayloadAction<string>) => {
        //     state.name = action.payload
        // },
        // setCustom: (state: CustomColumnsSliceState, action: PayloadAction<boolean>) => {
        //     state.custom = action.payload
        // },
        addColumn: (state: CustomColumnsSliceState, action: PayloadAction<CustomColumn>) => {
            state.columns.push(action.payload)
        }
    }
})

export default customColumnsSlice.reducer

export const { setExp, addColumn } = customColumnsSlice.actions

export function setExpAction(expChange: ExpActionType): PayloadAction<ExpActionType> {
    return setExp(expChange)
}

type StandardColumn = {
    table: string
    column: string
}

export function createStandardColumnAction(column: CustomColumn): PayloadAction<CustomColumn> {
    return addColumn(column)
}