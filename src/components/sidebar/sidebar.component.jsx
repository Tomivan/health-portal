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
      <Nav defaultActiveKey="/home" className="flex-column">
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link eventKey="/medical-records">Medical Records</Nav.Link>
          <Nav.Link eventKey="/patients">Patients</Nav.Link>
          <Nav.Link eventKey="/health-workers">Health Workers </Nav.Link>
          <Nav.Link eventKey="/admin">Admin </Nav.Link>
          <Nav.Link eventKey="/caretaker">Caretaker</Nav.Link>
          <Nav.Link eventKey="/notifications">Notifications</Nav.Link>
          <div className="profile-card">
              <img src={require("../../assets/images/user.png")} alt="user" onClick={displayBox}/>
              <div className="info-box">
                  <Link to="/profile" className="profile-link">Profile</Link>
                  <Link to="/" className="profile-link" onClick={() => localStorage.clear()}>Logout</Link>
              </div>
          </div>
    </Nav>
    );
};
export default Sidebar;
