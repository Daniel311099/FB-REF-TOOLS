import React, { useState } from "react";
import {Navigate} from 'react-router-dom'

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)

    async function submit(e) {
        e.preventDefault()
        const user = {name, email, password}
        const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        const content = await response.json()
        console.log(content)
        setRedirect(content)
    }

    if (redirect){
        return <Navigate to="/login"/>
    }
    return (
        <div>
            
        <form onSubmit={submit}>
            <img className="mb-4" src="/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"></img>
            <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
            <div className="form-floating">
                <input type="name" className="form-control" placeholder="Name"
                    onChange={e => setName(e.target.value)}
                ></input>
                <label for="floatingPassword">Name</label>
            </div>
            <div className="form-floating">
                <input type="email" className="form-control" placeholder="name@example.com"
                    onChange={e => setEmail(e.target.value)}
                ></input>
                <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                ></input>
                <label for="floatingPassword">Password</label>
            </div>
            {/* <div className="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me"> Remember me</input>
                </label>
            </div> */}
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign Up</button>
            {/* <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p> */}
        </form>
        </div>
    )
}