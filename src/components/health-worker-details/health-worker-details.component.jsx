import React, { useState } from 'react';
import { Link } from '@reach/router';
import Modal from 'react-modal'
import NotifyHealthWorker from '../notify-health-worker/notify-health-worker.component';
import SuspendHealthWorker from '../suspend-health-worker/suspend-health-worker.component';
import './health-worker-details.css';

const HealthworkerDetails = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [notificationModalIsOpen, setNotificationModalIsOpen] = useState(false);
    const [state, setState] = useState([]);        
    const [isLoading, setIsLoading] = useState(false);
    const [stat, setStat] = useState("");
    const data = props.location.state;
    const id = data._id;
    const handleSuspend = () => {
        setModalIsOpen(true);
        setStat("suspended")
    }
    const handleActivate = () => {
        setModalIsOpen(true);
        setStat("active")
    }

    const deleteHealthWorker = () => {
        setIsLoading(true)
    }
    return (
        <div>
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
                            <td><img src={!data.profilePicture ? require('../../assets/images/user.png') : data.profilePicture} alt="Profile" className="profile-picture"/></td>
                        </tr>
                    </table>
                    <div className="actions">
                    <button className="notify" onClick={() => setNotificationModalIsOpen}>Send Notification</button>
                    <Modal className="bg-modal" isOpen={notificationModalIsOpen}>
                        <div className="close-notification" onClick={() => setModalIsOpen(false)}> + </div>
                        <NotifyHealthWorker />
                    </Modal>
                    <Modal className="suspend-modal" isOpen={modalIsOpen}>
                        <div className="close-notification" onClick={() => setModalIsOpen(false)}> + </div>
                        <SuspendHealthWorker />
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
