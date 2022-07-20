import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import column from './stats'

const reducer = combineReducers({
    column,
})

const store = configureStore({
  reducer,
})

export default store;