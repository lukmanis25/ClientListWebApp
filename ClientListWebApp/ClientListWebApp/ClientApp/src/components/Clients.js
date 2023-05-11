import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';

function Clients() {
    
    const [isLoading, setIsLoading] = useState(false);
    const [clientsList, setClientsList] = useState([]);


    //Load clients from server on load
    useEffect(() => {
        setIsLoading(true);
        const getClientsAPI = async () => {
            let response = await fetch("clients");
            let jsonData = await response.json();
            setClientsList(jsonData);
            setIsLoading(false)
        }
        getClientsAPI();
    }, [])

    //delete API
    async function deleteClient(id) {
        const response = await fetch("clients/"+id, {
            method: "DELETE",
        });
        const jsonData = await response.json()

        if (jsonData === true) {
            console.log("dziala")
        }
        else {
            console.log("nie dziala")
        }
    }

    return (
        <main>
            {
                (!isLoading) ?
                    (<><ul className="list-group">
                        {
                            clientsList.map((c) => 
     
                                <li className="list-group-item d-flex justify-content-between">
                                    <p>Client {c.id}: {c.name} {c.surname}</p>
                                    <div>
                                        <Link to={"/" + c.id} >
                                            <button type="button" className="btn btn-primary"> Show more </button>
                                        </Link>
                                        <button type="button" className="btn btn-danger" onClick={() => deleteClient(c.id)}> Delete </button>
                                    </div>
                                </li>
                            )}
                    </ul>
                    <Link to={"/add"} >
                        <button type="button" className="btn btn-success" >ADD</button>
                    </Link>
                        
                    </>
                    ) :
                <div> Loading... </div>

            }
        </main>
    )

}
export default Clients;