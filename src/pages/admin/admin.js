import React, { useState, useEffect} from 'react';
import Modal from "react-modal";
import { navigate } from '@reach/router';
import './admin.css';
import Layout from '../../components/layout/layout';
import AdminModal from './admin-modal/admin-modal';
import ContentLoader from 'react-content-loader';

const Admin = () => {
    const [state, setState] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    useEffect(() => {
        fetch('https://freemind-api.herokuapp.com/v1/admin/admin/all',  {
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
                    console.log(response);
                    setState(response)
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
            <h2 className="heading">Admin</h2>
            {!state ?<div className="no-content">
               <ContentLoader />
            </div> :
            <div className="admin">
            {state ? <div className="total-admin">
                        <h4>Total Admins</h4>
                        <p>{state.count}</p>
                    </div> : undefined}
                <button className="create-admin-profile" onClick={() => setModalIsOpen(true)}>Create Admin</button>
                <Modal className="bg-modal" isOpen={modalIsOpen}>
                <div className="close-admin-form" onClick={() => setModalIsOpen(false)}> + </div>
                    <AdminModal />
                </Modal>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {state && state.data.map( data => (  <tr>
                            <td>{data.fullName}</td>
                            <td>{data.email}</td>
                            <td>{data.phoneNumber}</td>
                            <td>{data.role.name}</td>
                            <td><button className="view-details" onClick={() => navigate('/admin-details', {state: data})}>View details</button></td>
                        </tr>))}
                    </tbody>
                </table>
            </div>}
        </div>
        </>
    )
}

export default Admin;
