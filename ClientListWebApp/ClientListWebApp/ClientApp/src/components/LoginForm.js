import React, { useState, useEffect } from 'react';

const LoginForm = () => {
    

    return (
        <main>
        <h2>Login Form</h2>
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
export default LoginForm;