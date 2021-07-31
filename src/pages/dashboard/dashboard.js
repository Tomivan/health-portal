import React, { useEffect, useState} from 'react';
import { navigate } from '@reach/router';
import ContentLoader from 'react-content-loader';
import './dashboard.css';
import Layout from '../../components/layout/layout';

const Dashboard = () => {
    const [state, setState] = useState(null);
    useEffect(() => {
        fetch('https://freemind-api.herokuapp.com/v1/admin/dashboard',  {
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
    }, [])
  
    return (
        <>
        <Layout />
        <div className="dashboard-section">
             <h2 className="heading">Dashboard</h2>
            {state ?<div className="cards">
                <div className="cards-top">
                    <div className="card-info">
                        <h5>Total Health workers</h5>
                        <p>{state.workers}</p>
                    </div>
                    <div className="card-info">
                        <h5>Total Patients Registered</h5>
                        <p>{state.customer}</p>
                    </div>
                    <div className="card-info">
                        <h5>Booked Sessions</h5>
                        <p>{state.bookedSessions}</p>
                    </div>
                </div>
                <div className="cards-top">
                    <div className="cards-info">
                        <h5>Completed Sessions</h5>
                        <p>{state.completedSessions}</p>
                    </div>
                    <div></div>
                    <div></div>
                </div>
            </div> : 
            <div className="no-content">
            <ContentLoader />
            </div>}
        </div>
        </>
    )
}

export default Dashboard;
