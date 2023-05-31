import React, { useState } from 'react';
import Modal from 'react-modal';
import { navigate } from '@reach/router';
import ContentLoader from 'react-content-loader';
import HealthWorkerModal from '../health-worker-modal/health-worker-modal.component';
import './health-workers.css';

const HealthWorkers = () => {
    const [state, setState] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    return (
        <div>
            <div className="health-section">
                <h2 className="heading">Health Workers</h2>

                {!state ? <div className="no-content">
                <ContentLoader />
                </div> :
                <div className="health-workers">
                {state ? <div className="total-card">
                        <h4>Total Health Workers</h4>
                        <p>{state.totalCount}</p>
                    </div> : undefined}
                    <button className="create-worker" onClick={() => setModalIsOpen(true)}> Create health worker</button>
                    <Modal className="bg-modal" isOpen={modalIsOpen}>
                        <div className="close-form" onClick={() => setModalIsOpen(false)}> + </div>
                        <HealthWorkerModal />
                    </Modal>
                    <table className="health-worker-table">
                        <thead>
                            <tr className="table-row">
                                <th>Title</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email Address</th>
                                <th>Medical Field</th>
                                <th>Phone Number</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {state && state.workers.map( data => (<tr>
                                <td>{data.title}</td>
                                <td>{data.firstname}</td>
                                <td>{data.lastname}</td>
                                <td>{data.email}</td>
                                <td>{data.medicalField}</td>
                                <td>{data.phone}</td>
                                <td>{data.status}</td> 
                                <td><button className="view-details" onClick={() => navigate('/health-worker-details', {state: data})}>View full details</button></td>
                            </tr>))}
                    </tbody>
                    </table>
                </div>}
            </div>
        </div>
    )
}

export default HealthWorkers;
