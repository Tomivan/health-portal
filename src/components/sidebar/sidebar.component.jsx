import React from 'react';
import { Link } from '@reach/router';
import Nav from 'react-bootstrap/Nav';
import './sidebar.css';

const Sidebar = () => {
    
    function displayBox() {
        const box = document.querySelector('.info-box');
         if(box.style.display === 'flex') {
                box.style.display = 'none';
         } else {
                 box.style.display = 'flex';
         }
    }
    return(
        <Nav defaultActiveKey="/home" className="flex-column sidebar">
            <h2 className='h2'> Pheonix Health</h2>
            <Nav.Link href="/dashboard" className='link'>Dashboard</Nav.Link>
            <Nav.Link href="/medical-records" className='link'>Medical Records</Nav.Link>
            <Nav.Link href="/patients" className='link'>Patients</Nav.Link>
            <Nav.Link href="/health-workers" className='link'>Health Workers </Nav.Link>
            <Nav.Link href="/admin" className='link'>Admin </Nav.Link>
            <Nav.Link href="/caretaker" className='link'>Caretaker</Nav.Link>
            <Nav.Link href="/notifications" className='link'>Notifications</Nav.Link>
            <div className="profile-card">
                <img src={require("../../assets/images/user.png")} alt="user" onClick={displayBox} />
                <div className="info-box">
                    <Link to="/profile" className="profile-link">Profile</Link>
                    <Link to="/" className="profile-link" onClick={() => localStorage.clear()}>Logout</Link>
                </div>
            </div>
        </Nav>
    );
};
export default Sidebar;
