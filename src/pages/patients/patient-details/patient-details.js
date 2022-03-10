import React, { useState, useEffect } from 'react';
import { Link, navigate } from '@reach/router';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import './patient-details.css';
import Layout from '../../../components/layout/layout';

const PatientDetails = (props) => {
    const {handleSubmit, handleChange, register, reset } = useForm([]); 
    const [state, setState] = useState({});
    const [workerState, setWorkerState] = useState({});
    const [caretakerState, setCaretakerState] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [suspendModalIsOpen, setSuspendModalIsOpen] = useState(false);
    const [stat, setStat] = useState("");
    const data = props.location.state;
    const patientId = data._id;
    useEffect(() => {
        fetch('https://freemind-api.herokuapp.com/v1/admin/customer/' + patientId, {
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
                    setWorkerState(response.data)
                },
                err => { 
                    console.log(err)
                }
            )
    })
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
                    console.log(response.data)
                    setCaretakerState(response.data)
                    if(response.error === "Invalid token"){
                        navigate(`/`);
                    }
                },
                err => {
                    console.log(err)
                }
            )
    }, [])
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
                "user": patientId,
                "title": data.title,
                "body": data.body
                })
        })
        .then(resp => resp.json())
            .then(
                response => {
                    console.log(response.data)
                    setIsLoading(false);
                    if (response.success === true) {
                        alert("Message sent!");
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
    const assignWorker = (data) => {
        setIsLoading(true);
        fetch('https://freemind-api.herokuapp.com/v1/admin/customer/assign-caretaker', {
            method: "put",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "caretaker": data.role,
                "customer": patientId
                })
        })
        .then(resp => resp.json())
            .then(
                response => {
                    setWorkerState(response.data)
                    console.log(workerState.assignedCaretaker)
                    setIsLoading(false);
                    setModalIsOpen(false);
                    if (response.success === true) {
                        alert("Worker assigned!");
                    } else {
                        return alert("Oops! something went wrong, try again");
                    }
                },
                err => {
                    console.log(err)
                }
            )
    }
    const unassignWorker = () => {
        setIsLoading(true);
        fetch('https://freemind-api.herokuapp.com/v1/admin/customer/unassign-caretaker', {
            method: "put",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "customer": patientId
                })
        })
        .then(resp => resp.json())
            .then(
                response => {
                    setWorkerState(response.data)
                    console.log(state)
                    setIsLoading(false);
                    if (response.success === true) {
                        alert("Worker unassigned!");
                    } else {
                        return alert("Oops! something went wrong, try again");
                    }
                },
                err => {
                    console.log(err)
                }
            )
    }
    const suspendPatient = (data) => {
        const status = stat === 'suspended' ? "suspended": "active"
        setIsLoading(true);
        fetch('https://freemind-api.herokuapp.com/v1/admin/customer/update-status' , {
            method: "put",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "id": patientId,
                "reason": data.reason,
                "status": status
                })
        })
        .then(resp => resp.json())
            .then(
                response => {
                setState(response.data)
                setIsLoading(false);
                setSuspendModalIsOpen(false);
                },
                err => {
                    console.log(err)
                }
            )

    }
    const handleSuspend = () => {
        setSuspendModalIsOpen(true);
        setStat("suspended")
    }
    const handleActivate = () => {
        setSuspendModalIsOpen(true);
        setStat("active")
    }
    return (
        <div>
            <Layout />
            <div className="profile">
                <h2 className="heading">Full details</h2>
                <div className="back-link">
                <Link to="/patients">Back</Link>
                </div>
                <div className="profile-container">
                    <table id="profile-table">
                        <tr>
                            <td>Username</td>
                            <td>{data.username}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{data.email}</td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td>{data.gender}</td>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td>{data.type}</td>
                        </tr>
                        <tr>
                            <td>Location</td>
                            <td>{data.location}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>{state.status}</td>
                        </tr>
                      { data.type === "prestige" ? <tr>
                            <td>Assigned Worker</td>
                           {data.assignedCaretaker === null || data.assignedCaretaker === undefined ?
                          <td>Not assigned</td>:
                          <td>{data.assignedCaretaker.firstname} {data.assignedCaretaker.lastname}</td>}
                        </tr>: <tr></tr>}
                    </table>
                    <div className="actions">
                    <button className="notify" onClick={() => setModalIsOpen('notify')}>Send Notification</button>
                    <Modal className="bg-modal" isOpen={modalIsOpen === 'notify'}>
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
                            )} Send </button>
                        </form>
                    </Modal>
                    {data.type === "premium" ? <p></p> :
                    <div className="buttons">
                    {data.assignedCaretaker === undefined || data.assignedCaretaker === null ?
                    <button className="assign" onClick={() => setModalIsOpen('assign')}>Assign Worker</button>:
                    <button className="unassign" onClick={handleSubmit(unassignWorker)} id="unassign">Unassign Worker</button>}</div>}
                    <Modal className="bg-modal" isOpen={modalIsOpen === 'assign'}>
                        <div className="close-notification" onClick={() => setModalIsOpen(false)}> + </div>
                        <form onSubmit={handleSubmit(assignWorker)}className="assign-form">
                            <label className="role">Caretaker</label>
                            <select name="role" onChange={handleChange} ref={register({required: "Required"})}>
                             <option value=""> Select caretaker</option>
                             {caretakerState && caretakerState.map( data => (
                             <option key={data._id} value={data._id}>
                                 {data.firstname} {data.lastname}
                             </option>))}
                            </select>
                            <button className="login-button">
                                {isLoading && (
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                )} Assign </button>
                        </form>
                    </Modal>
                {state.status === "active" ?<button className="suspend" onClick={handleSuspend} id="suspend">Suspend</button>:
                <button className="activate" onClick={handleActivate} id="activate">Activate</button>}
                    <Modal className="suspend-modal" isOpen={suspendModalIsOpen}>
                        <div className="close-notification" onClick={() => setSuspendModalIsOpen(false)}> + </div>
                        <form onSubmit={handleSubmit(suspendPatient)} className="suspend-form">
                            <label>Reason</label>
                            <textarea type="text" name="reason" onChange={handleChange} ref={register({required: "Required"})} 
                            className="input"/>
                            <button className="login-button"> 
                            {isLoading && (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                            )} Send </button>
                        </form>
                    </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}

 
export default PatientDetails;
