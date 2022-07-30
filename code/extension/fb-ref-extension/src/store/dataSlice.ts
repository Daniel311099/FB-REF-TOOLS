import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type pageColumn = {
    coid: string | null
    name: string
    table_id: string
}

export type PageTable = {
    id: string | null
    name: string
    columns: pageColumn[]
}

export interface DataSliceState {
    tables: PageTable[]
}

const initialState: DataSliceState = {
    tables: [],
}

const pageTablesSlice = createSlice({
    name: 'pageTables',
    initialState,
    reducers: {
        addTable: (state: DataSliceState, action: PayloadAction<PageTable>) => {
            state.tables.push(action.payload)
        }
    }
})

export default pageTablesSlice.reducer

export const { addTable } = pageTablesSlice.actions

export const addPageTablesAction = (table: PageTable): PayloadAction<PageTable> => {

    return addTable(table)
}
