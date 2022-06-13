import React from 'react';
import logo from './logo.svg';
import './App.css';
import { NewNoteInput } from './NewNoteInput';
import {useSelector, useDispatch} from 'react-redux'
import {addTodo, removeTodo, selectTodos} from './store'

function App() {
    const dispatch = useDispatch()
    const todos = useSelector(selectTodos)

    const todoList = todos.map(todo => {
        console.log(todos)
        return (
            <li key={todo.id}>
                {todo.text} {todo.id}
                <button value={todo.id} onClick={() => {onRemove(todo.id)}}>remove</button>
            </li>
        )
    })
    console.log(todos)

    const onAddNote = (note:string) => {
        dispatch(addTodo(note))
    }

    const onRemove = (id: number) => {
        dispatch(removeTodo(id))
    }

  return (
    <div>
        <NewNoteInput addNote={onAddNote} />
        <hr/>
        <ul>
            {todoList}
        </ul>
    </div>

  );
}

export default App;
