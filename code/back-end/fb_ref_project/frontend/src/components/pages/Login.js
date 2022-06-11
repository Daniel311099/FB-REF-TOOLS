import React, {useState} from "react";
import { Navigate } from "react-router";

export default function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)

    async function submit(e) {
        e.preventDefault()
        const user = {email, password}
        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(user)
        })
        const content = await response.json()
        console.log(content)
        props.setName('')
        setRedirect(content.auth)
    }

    if (redirect || props.name){
        return <Navigate to="/"/>
    }

    return (
        <form onSubmit={submit}>
            <img className="mb-4" src="/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"></img>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
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
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            {/* <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p> */}
        </form>
    )
}