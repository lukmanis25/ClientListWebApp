import React, { useState, useEffect } from 'react';

const Add = () => {

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [date, setDate] = useState("")
    const [password, setPassword] = useState("")
    const [categoryId, setCategoryId] = useState(1)

    const [categories, setCategories] = useState([])

    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    //Get all cattegories
    const getCategoriesAPI = async () => {
        let response = await fetch("category");
        let jsonData = await response.json();
        setCategories(jsonData);
        console.log(jsonData)
        setCategoryId(jsonData[0]['id'])
        setIsLoading(false)
    }

    useEffect(() => {
        setIsLoading(true);
        getCategoriesAPI();
    }, [])

    //POST API
    async function PostClient(e) {
        e.preventDefault();
        setMessage("Loading...")
        let clientInfo = {
            "name": name,
            "surname": surname,
            "email": email,
            "password": password,
            "subcategory": "jakas",
            "phone": phone,
            "dateOfBirth": date,
            "categoryId": categoryId
        };
        const response = await fetch("clients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(clientInfo),
        });
        console.log(response)
        if (response.redirected) {
            setMessage("Permission denied")
            return
        }

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
            {(!isLoading) ? (<>
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
                    <div className="form-group">
                        <label htmlFor="category_input">Select category:</label>
                        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="form-control" id="category_input">
                            {categories.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}

                            
                        </select>
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
            </>) :
                (<div> Loading... </div>)}

            
        </main>
    )

}
export default Add;