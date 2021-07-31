import React, { useState, useEffect } from 'react';
import { Link, navigate } from '@reach/router';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal'
import './health-worker-details.css';
import Layout from '../../../components/layout/layout';

const HealthworkerDetails = (props) => {
    const {handleSubmit, handleChange, register, reset } = useForm([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [notificationModalIsOpen, setNotificationModalIsOpen] = useState(false);
    const [state, setState] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [stat, setStat] = useState("");
    const data = props.location.state;
    const id = data._id;
    useEffect(() => {
        fetch('https://freemind-api.herokuapp.com/v1/admin/workers/' + id, {
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
                },
                err => { 
                    console.log(err)
                }
            )
    },[state.status])
    const suspendHealthWorker = () => {
        const status = stat === 'suspended' ? "suspended": "active"
        setIsLoading(true);
        fetch('https://freemind-api.herokuapp.com/v1/admin/workers/suspend', {
            method: "put",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "id": id,
                "status": status,
                "reason": data.reason,
                })
        })
        .then(resp => resp.json())
            .then(
                response => {
                console.log (response.data)
                setState(response.data)
                setIsLoading(false);
                setModalIsOpen(false);
                },
                err => {
                    console.log(err)
                }
            )
    }
    const handleSuspend = () => {
        setModalIsOpen(true);
        setStat("suspended")
    }
    const handleActivate = () => {
        setModalIsOpen(true);
        setStat("active")
    }

    const deleteHealthWorker = () => {
        setIsLoading(true);
        fetch('https://freemind-api.herokuapp.com/v1/admin/workers/' + id, {
            method: "delete",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        })
        .then(resp => resp.json())
            .then(
                response => {
                    if (response.success === true) {
                        setIsLoading(false);
                        navigate('/health-workers');
                    } else {
                        return alert("Profile not deleted");
                    }
                },
                err => {
                    console.log(err)
                }
            )

    }
    const sendNotification = (data) => {
        setIsLoading(true);
        fetch('https://freemind-api.herokuapp.com/v1/admin/notification', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "user": id,
                "title": data.title,
                "body": data.body
                })
        })
        .then(resp => resp.json())
            .then(
                response => {
                    if (response.success === true) {
                        alert("Message sent!");
                        setIsLoading(false);
                        reset();
                    } else {
                        return alert("Message not sent");
                    }
                },
                err => {
                    console.log(err)
                }
            )
    }
    return (
        <div>
            <Layout />
            <div className="profile">
                <h2 className="heading">Full Profile</h2>
                <div className="back-link">
                <Link to="/health-workers">Back</Link>
                </div>
                <div className="profile-container">
                    <table>
                        <tr>
                            <td>Title</td>
                            <td className="second">{data.title}</td>
                        </tr>
                        <tr>
                            <td>First Name</td>
                            <td className="second">{data.firstname}</td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td className="second">{data.lastname}</td>
                        </tr>
                        <tr>
                            <td>Email Address</td>
                            <td className="second">{data.email}</td>
                        </tr>
                        <tr>
                            <td>Phone Number</td>
                            <td className="second">{data.phone}</td>
                        </tr>
                        <tr>
                            <td>Medical Field</td>
                            <td className="second">{data.medicalField}</td>
                        </tr>
                        <tr>
                            <td>License Number</td>
                            <td className="second">{data.licenceNumber}</td>
                        </tr>
                        <tr>
                            <td>Degree</td>
                            <td className="second">{data.degree}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td className="second">{state.status}</td>
                        </tr>
                        <tr>
                            <td>Bio</td>
                            <td className="second">{data.bio}</td>
                        </tr>
                        <tr>
                            <td><img src={!data.profilePicture ? require('../../../assets/images/user.svg') : data.profilePicture} alt="Profile" className="profile-picture"/></td>
                        </tr>
                    </table>
                    <div className="actions">
                    <button className="notify" onClick={() => setNotificationModalIsOpen}>Send Notification</button>
                    <Modal className="bg-modal" isOpen={notificationModalIsOpen}>
                        <div className="close-notification" onClick={() => setModalIsOpen(false)}> + </div>
                        <form onSubmit={handleSubmit(sendNotification)}className="notification-form">
                            <label>Title</label>
                            <input type="text" name="title" onChange={handleChange} ref={register({required: "Required"})} 
                            className="input"/>
                            <label>Message</label>
                            <textarea type="text" name="body" onChange={handleChange} ref={register({required: "Required"})} 
                            className="input"/>
                            <button className="login-button"> 
                            {isLoading && (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                            )}Send </button>
                        </form>
                    </Modal>
                    <Modal className="suspend-modal" isOpen={modalIsOpen}>
                        <div className="close-notification" onClick={() => setModalIsOpen(false)}> + </div>
                        <form onSubmit={handleSubmit(suspendHealthWorker)} className="suspend-form">
                            <label>Reason</label>
                            <textarea type="text" name="reason" onChange={handleChange} ref={register({required: "Required"})} 
                            className="input"/>
                            <button className="login-button"> 
                            {isLoading && (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                            )}Send </button>
                        </form>
                    </Modal>
                   {state.status === "active" ? <button className="suspend" onClick={handleSuspend} id="suspend">Suspend</button>:
                    <button className="activate" onClick={handleActivate} id="activate">Activate</button>}
                    <button className="delete" onClick={deleteHealthWorker}>
                    {isLoading && (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                    )}Delete Profile</button>
                    </div>
                </div>
            
            </div>
        </div>
    )
}

export default HealthworkerDetails;
