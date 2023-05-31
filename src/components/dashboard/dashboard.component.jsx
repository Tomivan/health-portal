import React, { useState} from 'react';
import { navigate } from '@reach/router';
import ContentLoader from 'react-content-loader';
import './dashboard.css';

const Dashboard = () => {
    const [state, setState] = useState(null);
    
    return (
        <div>
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
        </div>
    )
}

export default Dashboard;
