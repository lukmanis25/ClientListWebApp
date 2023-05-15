import React, { useState, useEffect } from 'react';

const RegisterForm = () => {

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState(null)

    async function postRegister(e) {
        e.preventDefault();
        setMessage("Loading...")
        let clientInfo = {
            "login": login,
            "password": password
        };
        console.log(clientInfo)
        const response = await fetch("account/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(clientInfo),
        });
        const jsonData = await response.json()

        if (jsonData === true) {
            setMessage("Register succesful")
        }
        else {
            setMessage("Something went wrong")
        }
    }

    return (
        <main>
            <h2>Regoster Form</h2>
            <form onSubmit={(e) => postRegister(e)}>
                <div className="form-group">
                    <label htmlFor="inputLogin">Login</label>
                    <input type="text" className="form-control" id="inputLogin" placeholder="Login" onChange={(e) => setLogin(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {
                message ?
                    (
                        <div className="alert alert-primary" role="alert">
                            {message}
                        </div>) :
                    (<></>)
            }
        </main>
    )

}
export default RegisterForm;