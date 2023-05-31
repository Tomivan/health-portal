import React, { useState } from 'react';
import Modal from "react-modal";
import { navigate } from '@reach/router';
import CaretakerModal from '../caretaker-modal/caretaker-modal.component';
import ContentLoader from 'react-content-loader';
import './caretaker.css';

const Caretaker = () => {
    const [state, setState] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div>
            <div className="admin-section">
                <h2 className="heading">Caretaker</h2>
                {!state ?<div className="no-content">
                <ContentLoader />
                </div> :
                <div className="admin">
                {/* {state ? <div className="total-admin">
                            <h4>Total Admins</h4>
                            <p>{state.count}</p>
                        </div> : undefined} */}
                    <button className="create-admin-profile" onClick={() => setModalIsOpen(true)}>New Caretaker</button>
                    <Modal className="bg-modal" isOpen={modalIsOpen}>
                    <div className="close-admin-form" onClick={() => setModalIsOpen(false)}> + </div>
                        <CaretakerModal />
                    </Modal>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {state && state.map( data => (  <tr>
                                <td>{data.firstname}</td>
                                <td>{data.lastname}</td>
                                <td>{data.email}</td>
                                <td>{data.phone}</td>
                                <td><button className="view-details" onClick={() => navigate('/caretaker-details', {state: data})}>View details</button></td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>}
            </div>
        </div>
    )
}

export default Caretaker;
