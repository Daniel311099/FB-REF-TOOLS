//Ap.js

import React from 'react'
import { useQuery } from 'react-query'
import fetchPosts from './FetchApi';
import './App.css';

type user = {
    name: String
}

type data = {
    data: any
    error: any
    isLoading: boolean
    isError: boolean
}

// inject ui controls here
// wrap menu in shadow root
    
function App() {

    const { data, error, isError, isLoading }: data = useQuery('users', fetchPosts)
    
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error! {error.message}</div>
    }
    
    return (
        <div className=''>
            <h1 className='container'>Users Name</h1>
            {
                data.map((users: user, id: any) => {
                    return <li className='container' key={id}>{users.name}</li>
                })
            }
    
        </div>
    )
}
    
export default App;