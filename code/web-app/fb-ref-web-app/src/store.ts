import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ToDo {
    id: number
    done: boolean
    text: string
}

interface TodosSliceState {
    todos: ToDo[]
}

const initialState: TodosSliceState = {
    todos: []
}

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            let num:number = state.todos.length
            console.log(num, state.todos[num])
            let newId:number = (num>0 ? state.todos[num-1].id+1 : 0)
            state.todos = [
                ...state.todos,
                {
                    id: newId,
                    text: action.payload,
                    done: false
                }
            ]
        },
        removeTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter(todo => {
                return todo.id !== action.payload
            })
        },
    }
})

export const {addTodo, removeTodo} = todosSlice.actions

const store =  configureStore({
    reducer: {
        todos: todosSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>

export const selectTodos = (state:RootState) => state.todos.todos

export default store