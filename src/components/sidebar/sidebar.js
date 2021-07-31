import React from 'react';
import { SideNavItems, SideNavLink } from 'carbon-components-react/lib/components/UIShell';
import { Link, useLocation } from '@reach/router';
import './sidebar.css';
import { StyledSideNav } from './styles';

const items = [
    { name: 'Dasboard', path: '/dashboard' },
    { name: 'Medical Records', path: '/medical-records' },
    { name: 'Patients', path: '/patients' },
    { name: 'Health Workers', path: '/health-workers' },
    { name: 'Admin', path: '/admin'},
    { name: 'Caretaker', path: '/caretaker'},
    { name: 'Notifications', path: '/notifications'}
  ];

const Sidebar = () => {
    const location = useLocation();
    function displayBox() {
        const box = document.querySelector('.info-box');
         if(box.style.display === 'flex') {
                box.style.display = 'none';
         } else {
                 box.style.display = 'flex';
         }
    }
    return(
        <StyledSideNav isFixedNav expanded isChildOfHeader={false} aria-label="Side Navigation" class="sidenav">
           <div className="nav-heading">
               <img src={require('../../assets/images/logo.svg')} alt="super admin" className="super-admin"/>
               <h2 className="h2">Freemind</h2>
           </div>
            <SideNavItems>
            {items.map(i => (
          <SideNavLink
            isActive={
              location.pathname === '/' && i.path === '/' ? true : location.pathname === i.path
            }
            element={Link}
            to={i.path}
            key={i.name}
          >
            {i.name}
          </SideNavLink>
        ))}
            </SideNavItems>
            <div className="profile-card">
                <img src={require("../../assets/images/user.svg")} alt="user" onClick={displayBox}/>
                <div className="info-box">
                    <Link to="/profile" className="profile-link">Profile</Link>
                    <Link to="/" className="profile-link" onClick={() => localStorage.clear()}>Logout</Link>
                </div>
            </div>
        </StyledSideNav>
    );
};
export default Sidebar;
