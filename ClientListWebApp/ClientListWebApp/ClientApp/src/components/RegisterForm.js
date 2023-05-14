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
        const response = await fetch("account", {
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
            <form>
                <div class="form-group">
                    <label for="inputLogin">Login</label>
                    <input type="text" class="form-control" id="inputLogin" placeholder="Login"></input>
                </div>
                <div class="form-group">
                    <label for="inputPassword">Password</label>
                    <input type="password" class="form-control" id="inputPassword" placeholder="Password"></input>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </main>
    )

}
export default RegisterForm;