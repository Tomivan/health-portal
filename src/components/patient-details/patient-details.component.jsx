import React, { useState } from 'react';
import { Link } from '@reach/router';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import AssignCaretaker from '../assign-caretaker/assign-caretaker.component';
import SuspendPatient from '../suspend-patient/suspend-patient.component';
import './patient-details.css';

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
    
    const unassignWorker = () => {
        setIsLoading(true);
        fetch('https://freemind-api.herokuapp.com/v1/admin/customer/unassign-caretaker', {
            method: "put",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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
                        <NotifyPatient />
                    </Modal>
                    {data.type === "premium" ? <p></p> :
                    <div className="buttons">
                    {data.assignedCaretaker === undefined || data.assignedCaretaker === null ?
                    <button className="assign" onClick={() => setModalIsOpen('assign')}>Assign Worker</button>:
                    <button className="unassign" onClick={handleSubmit(unassignWorker)} id="unassign">Unassign Worker</button>}</div>}
                    <Modal className="bg-modal" isOpen={modalIsOpen === 'assign'}>
                        <div className="close-notification" onClick={() => setModalIsOpen(false)}> + </div>
                        <AssignCaretaker />
                    </Modal>
                {state.status === "active" ?<button className="suspend" onClick={handleSuspend} id="suspend">Suspend</button>:
                <button className="activate" onClick={handleActivate} id="activate">Activate</button>}
                    <Modal className="suspend-modal" isOpen={suspendModalIsOpen}>
                        <div className="close-notification" onClick={() => setSuspendModalIsOpen(false)}> + </div>
                        <SuspendPatient />
                    </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}

 
export default PatientDetails;
