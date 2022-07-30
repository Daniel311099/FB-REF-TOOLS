import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type placeholder = {
    id: number
    char: string
    custom: boolean
    column: string | null
    custom_column: string | null 
}

interface placeholdersSliceState {
    placeholders: {[key: string]: placeholder}
    table_id: string
}

const initialState: placeholdersSliceState = {
    placeholders: {},
    table_id: '',
}

const placeholdersSlice = createSlice({
    name: 'placeholders',
    initialState,
    reducers: {
        setPlaceholder: (state: placeholdersSliceState, action: PayloadAction<placeholder>) => {
            state.placeholders[action.payload.id] = action.payload
        }
    }
})

export default placeholdersSlice.reducer

const {setPlaceholder} = placeholdersSlice.actions

export function setPlaceholderAction(placeholder: placeholder): PayloadAction<placeholder> {
    return setPlaceholder(placeholder)
}