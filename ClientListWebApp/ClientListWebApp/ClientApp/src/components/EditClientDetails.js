import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditClientDetails = () => {
    const { id } = useParams();

    const [clientDetails, setClientDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")

    const [message, setMessage] = useState(null)




    //get client API
    async function getClientDetailsAPI() {
        const response = await fetch("clients/" + id);
        const jsonData = await response.json();
        await setClientDetails(jsonData)
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
        let clientInfo = {
            "name": name ? name : clientDetails.name,
            "surname": surname ? surname : clientDetails.surname,
            "email": "",
            "password": "",
            "category": "",
            "subcategory": "",
            "phone": 1,
            "dateOfBirth": "2001",
        };
        console.log(clientInfo)
        const response = await fetch("clients/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(clientInfo),
        });
        const jsonData = await response.json()

        if (jsonData === true) {
            setMessage("Client succesful edited")
        }
        else {
            setMessage("Something went wrong")
        }
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