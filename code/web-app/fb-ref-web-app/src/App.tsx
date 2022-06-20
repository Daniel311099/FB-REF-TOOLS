import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { NewNoteInput } from './NewNoteInput';
import {useSelector, useDispatch} from 'react-redux'
import {addTodo, removeTodo, selectTodos} from './store'

interface Record {
    stats: Object[]
}

function App () {
    const [stats, setStats] = useState<object[]>([])
    const dispatch = useDispatch()
    const todos = useSelector(selectTodos)

    const URL = 'http://localhost:8000/scraper_api/stats'

    const todoList = todos.map(todo => {
        console.log(todos)
        return (
            <li key={todo.id}>
                {todo.text} {todo.id}
                <button value={todo.id} onClick={() => {onRemove(todo.id)}}>remove</button>
            </li>
        )
    })

    const onAddNote = (note:string) => {
        dispatch(addTodo(note))
    }

    const onRemove = (id: number) => {
        dispatch(removeTodo(id))
    }

    const getStats = async () => {
        const response = await fetch(URL, {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            // sameSite: 'none',
        })
        const content = await response.json()
        console.log(content.data)
        setStats((content.data))
    }

  return (
    <div>
        <NewNoteInput addNote={onAddNote} />
        <hr/>
        <ul>
            {todoList}
        </ul>
        <button onClick={getStats}>get stats</button>
        {JSON.stringify(stats)}
    </div>

  );
}

export default App;
