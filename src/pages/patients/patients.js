import React,{ useState, useEffect } from 'react';
import { navigate } from '@reach/router'
import './patients.css';
import Layout from '../../components/layout/layout';
import ContentLoader from 'react-content-loader';

const Patients = () => {
    const[state, setState] = useState(null);
    useEffect(() => {
        fetch('https://freemind-api.herokuapp.com/v1/admin/customer', {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        })
        .then(resp => resp.json())
            .then(
                response => {
                    setState(response.data)
                    if(response.error === "Invalid token"){
                        navigate(`/`);
                    }
                },
                err => { 
                    console.log(err)
                }
                
            )
    },[state])
    return (
        <>
        <Layout />
        <div className="patients-section">
            <h2 className="heading">Patients</h2>
        </div>
        {!state ?<div className="no-content">
            <ContentLoader />
        </div> :
       <div className="patients">
       {state ? <div className="total-card">
                        <h4>Total Patients</h4>
                        <p>{state.totalCount}</p>
                    </div> : undefined}
        <table className="patient-table">
                        <thead>
                            <tr className="table-row">
                                <th>Username</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Type</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {state && state.customers.map( data => (<tr>
                                <td>{data.username}</td>
                                <td>{data.email}</td>
                                <td>{data.gender}</td>
                                <td>{data.type}</td>
                                <td>{data.location}</td>
                                <td>{data.status}</td>
                                <td><button className="view-details" onClick={() => navigate('/patient-details', {state: data})}>View full details</button></td>
                            </tr>))}
                    </tbody>
                </table>
       </div>}
        </>
    )
}

export default Patients;
