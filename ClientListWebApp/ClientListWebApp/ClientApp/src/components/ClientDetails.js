import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ClientDetails = () => {
    const { id } = useParams();


    const [clientDetails, setClientDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false)


    async function getClientDetailsAPI() {
        const response = await fetch("clients/"+id);
        const jsonData = await response.json();
        setClientDetails(jsonData)
        setIsLoading(false);
    }

    //Load client detail on load
    useEffect(() => {
        setIsLoading(true);
        getClientDetailsAPI();
    }, [])

    return (
        <main>
            
            {clientDetails != null ?
                (<>
                    <h2>{clientDetails.name} {clientDetails.surname} {clientDetails.id}</h2>
                    <div>Email: {clientDetails.email}</div>
                    <div>Category: {clientDetails.category}</div>
                    <div>SubCategory: {clientDetails.subcategory}</div>
                    <div>Phone: {clientDetails.phone}</div>
                    <div>Date: {clientDetails.dateofbirth}</div>
                    <Link to={"/" + id + "/edit"} >
                        <button type="button" className="btn btn-primary"> Edit </button>
                    </Link>
                </>
                )
                :
                (<div>Loading...</div>)
            }
        </main>
    )

}
export default ClientDetails;