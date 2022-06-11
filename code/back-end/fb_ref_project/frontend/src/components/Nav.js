import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Nav(props) {
    // const [name, setName] = useState(props.name)
    const logout = async () => {
        const response = await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        const content = await response.json()
        console.log(content)

        props.setName('')
    }

    let menu
    if (!props.name) {
        console.log(props.name, 1)
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/app/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
                </li>
            </ul>
        )
    } else {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/" onClick={logout}
                    >Logout</Link>
                </li>
            </ul>
        )
    }
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Home</Link>
                
                <div>
                    {menu}
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                </div>
            </div>
        </nav>
    )
}