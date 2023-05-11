import React, { useState, useEffect } from 'react';

const Add = () => {

    const [id, setId] = useState(null)
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")

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
    "dateOfBirth": "2001.01.01"
    }
*/
    //POST API
    async function PostClient(e) {
        e.preventDefault();
        let clientInfo = {
            "id": id,
            "name": name,
            "surname": surname,
            "email": "",
            "password": "",
            "category": "",
            "subcategory": "",
            "phone": 1,
            "dateOfBirth": "2001",
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
                    <label htmlFor="id_input">Id</label> 
                    <input type="text" className="form-control" id="id_input" placeholder="Id" onChange={(e) => setId(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="name_input">Name</label>
                    <input type="text" className="form-control" id="name_input" placeholder="name" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="surname_input">Surname</label>
                    <input type="text" className="form-control" id="surname_input" placeholder="surname" onChange={(e) => setSurname(e.target.value)} />
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