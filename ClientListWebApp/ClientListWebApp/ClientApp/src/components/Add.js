import React, { useState, useEffect } from 'react';

const Add = () => {

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [date, setDate] = useState("")
    const [password, setPassword] = useState("")

    const [message, setMessage] = useState(null)

/* some bodu for post
    {
    "id": 4,
    "name": "lukas",
    "surname": "ktos",
    "email": "",
    "password": "",
    "category": "",
    "subcategory": "",
    "phone": 1,
    "dateOfBirth": "2001-01-01"
    }
*/
    //POST API
    async function PostClient(e) {
        e.preventDefault();
        setMessage("Loading...")
        let clientInfo = {
            "name": name,
            "surname": surname,
            "email": email,
            "password": password,
            "category": "jakas",
            "subcategory": "jakas",
            "phone": phone,
            "dateOfBirth": date,
        };
        console.log(clientInfo)
        const response = await fetch("clients", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",       
            },
            body: JSON.stringify(clientInfo),
        });
        const jsonData = await response.json()
        
        if (jsonData === true) {
            setMessage("New client succesful added")
        }
        else {
            setMessage("Something went wrong")
        }
    }
    return (
        <main>
            <form onSubmit={(e) => PostClient(e)}>
                <h2>Please Enter Client Details...</h2>
                <div className="form-group">
                    <label htmlFor="name_input">Name</label>
                    <input type="text" className="form-control" id="name_input" placeholder="name" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="surname_input">Surname</label>
                    <input type="text" className="form-control" id="surname_input" placeholder="surname" onChange={(e) => setSurname(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="email_input">Email</label>
                    <input type="email" className="form-control" id="email_input" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password_input">Password</label>
                    <input type="password" className="form-control" id="password_input" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone_input">Phone</label>
                    <input type="phone" className="form-control" id="phone_input" placeholder="phone" onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="date_input">Date Of Birth</label>
                    <input type="date" className="form-control" id="date_input" placeholder="date" onChange={(e) => setDate(e.target.value)} />
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
export default Add;