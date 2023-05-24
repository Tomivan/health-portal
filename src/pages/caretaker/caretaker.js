import React, { useState, useEffect} from 'react';
import Modal from "react-modal";
import { navigate } from '@reach/router';
import './caretaker.css';
import Layout from '../../components/layout/layout';
import CaretakerModal from './caretaker-modal/caretaker-modal';
import ContentLoader from 'react-content-loader';

const Caretaker = () => {
    const [state, setState] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    useEffect(() => {
        fetch('https://freemind-api.herokuapp.com/v1/admin/care-taker',  {
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
                    console.log(response.data);
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
        </>
    )
}

export default Caretaker;
