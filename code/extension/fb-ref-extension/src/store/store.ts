import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
// import column from './columnStore'
import pageTables from './dataSlice'

export const reducer = combineReducers({
    // column,
    pageTables,
})

export type rootState = ReturnType<typeof reducer>

export const useTypedSelector: TypedUseSelectorHook<rootState> = useSelector

const store = configureStore<rootState>({
  reducer,
})

export default store;