import React, {useState, useEffect, Component} from "react";
// import '../css/SignIn.css'
import Login from "./pages/Login";
import Nav from "./Nav";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route, render } from "react-router-dom";

export default function SignIn() {

    const [name, setName] = useState("")

    useEffect( () => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/user', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                })
                const content = await response.json()
                setName(content.name)
                console.log(content)
                    }
        )()
    })

    return (
        <div className="SignIn">
            <BrowserRouter> 
                <Nav name={name} setName={setName}/>

                <main className="form-signin">
                    <Routes>
                        <Route path="" element={<Home name={name}/>} />
                        <Route path="/login" element={<Login setName={setName}/>} />
                        <Route path="/register" element={<Register/>} />
                    </Routes>
                {/* <Login /> */}
                </main>
            </BrowserRouter>
        </div>
    )
}