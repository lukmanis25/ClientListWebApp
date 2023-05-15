import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditClientDetails = () => {
    const { id } = useParams();

    const [clientDetails, setClientDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [date, setDate] = useState("")
    const [password, setPassword] = useState("")
    const [subcategory, setSubcategory] = useState("")
    const [categoryId, setCategoryId] = useState(1)

    const [message, setMessage] = useState(null)

    const [categories, setCategories] = useState([])

    //Get all cattegories
    const getCategoriesAPI = async () => {
        let response = await fetch("category");
        let jsonData = await response.json();
        setCategories(jsonData);
        setCategoryId(jsonData[0]['id'])
        setIsLoading(false)
    }


    //get client API
    async function getClientDetailsAPI() {
        const response = await fetch("clients/" + id);
        const jsonData = await response.json();
        await setClientDetails(jsonData)
        await getCategoriesAPI() // get categories
        setIsLoading(false);
    }

    //Load client detail on load
    useEffect(() => {
        setIsLoading(true);
        getClientDetailsAPI();
    }, [])

    //PUT API
    async function updateClient(e) {
        e.preventDefault();
        setMessage("Loading...")
        let clientInfo = {
            "name": name ? name : clientDetails.name,
            "surname": surname ? surname : clientDetails.surname,
            "email": email ? email : clientDetails.email,
            "password": password ? password : clientDetails.password,
            "subcategory": subcategory ? subcategory : clientDetails.subcategory,
            "phone": phone ? subcategory : clientDetails.phone,
            "dateOfBirth": date ? date : clientDetails.dateOfBirth,
            "categoryId": categoryId
        };
        const response = await fetch("clients/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(clientInfo),
        });
        if (response.redirected) {
            setMessage("Permission denied")
            return
        }
        const jsonData = await response.json()

        if (jsonData === true) {
            setMessage("Client succesful edited")
        }
        else {
            setMessage("Bad input")
        }
    }

    function changeCategory(e) {
        setCategoryId(e.target.value)
        setSubcategory("niezdefiniowane")
    }
    return (
        <main>
            {(!isLoading) ? (<>
                <form onSubmit={(e) => updateClient(e)}>
                    <div className="form-group">
                        <label htmlFor="name_input">Name</label>
                        <input type="text" className="form-control" id="name_input" placeholder="name" onChange={(e) => setName(e.target.value)} defaultValue={clientDetails?.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="surname_input">Surname</label>
                        <input type="text" className="form-control" id="surname_input" placeholder="surname" onChange={(e) => setSurname(e.target.value)} defaultValue={clientDetails?.surname} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email_input">Email</label>
                        <input type="email" className="form-control" id="email_input" placeholder="email" onChange={(e) => setEmail(e.target.value)} defaultValue={clientDetails?.email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password_input">Password</label>
                        <input type="password" className="form-control" id="password_input" placeholder="password" onChange={(e) => setPassword(e.target.value)} defaultValue={clientDetails?.password} />
                        <small id="passwordHelp" className="form-text text-muted">Min 6 char, 1 digit, 1 big letter</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone_input">Phone</label>
                        <input type="phone" className="form-control" id="phone_input" placeholder="phone" onChange={(e) => setPhone(e.target.value)} defaultValue={clientDetails?.phone} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date_input">Date Of Birth</label>
                        <input type="date" className="form-control" id="date_input" placeholder="date" onChange={(e) => setDate(e.target.value)} defaultValue={clientDetails?.dateOfBirth} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category_input">Select category:</label>
                        <select value={categoryId} onChange={(e) => changeCategory(e)} className="form-control" id="category_input">
                            {categories.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}


                        </select>
                    </div>
                    {(categories[categoryId - 1]?.sluzbowySubcategories.length > 0) &&
                        <div className="form-group">
                            <label htmlFor="subcategory_input">Select subcategory:</label>
                            <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)} className="form-control" id="subcategory_input">
                                <option key={"niezdefiniowane"} value={"niezdefiniowane"}>
                                    {"niezdefiniowane"}
                                </option>
                                {categories[categoryId - 1].sluzbowySubcategories.map(option => (
                                    <option key={option.name} value={option.name}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    }
                    {
                        (categories[categoryId - 1]?.isOther) &&
                        <div className="form-group">
                            <label htmlFor="subcategory_input">Subcategory</label>
                                <input type="text" className="form-control" id="subcategory_input" placeholder="subcategory" onChange={(e) => setSubcategory(e.target.value)} />
                        </div>
                    }

                    <button type="submit" className="btn btn-primary">Submit changes</button>
                </form>
            </>
            ) : <div> Loading... </div>}
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
export default EditClientDetails;