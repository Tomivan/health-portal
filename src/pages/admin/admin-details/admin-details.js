import React, { useState } from 'react';
import { Link, navigate } from '@reach/router';
import './admin-details.css'
import Layout from '../../../components/layout/layout';

const AdminDetails = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const data = props.location.state;
    const adminId = data._id;
    const deleteAdmin = () => {
        setIsLoading(true);
        fetch('https://freemind-api.herokuapp.com/v1/admin/admin/' + adminId, {
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
                    console.log(response.data)
                    setIsLoading(false);
                    if (response.success === true) {
                        navigate('/admin')
                    } else {
                        return alert("Profile not deleted!");
                    }
                },
                err => {
                    console.log(err)
                }
            )

    }
    return(
        <div>
            <Layout />
            <div className="profile">
                <h2 className="heading">Full details</h2>
                <div className="back-link">
                <Link to="/admin">Back</Link>
                </div>
                <div className="profile-container">
                    <table>
                        <tr>
                            <td>Full Name</td>
                            <td>{data.fullName}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{data.email}</td>
                        </tr>
                        <tr>
                            <td>Phone Number</td>
                            <td>{data.phoneNumber}</td>
                        </tr>
                        <tr>
                            <td>Role</td>
                            <td>{data.role.name}</td>
                        </tr>
                    </table>
                    <button className="delete" onClick={deleteAdmin}>
                    {isLoading && (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                    )}Delete Admin</button>
                </div>
            </div>
        </div>
    )
}

export default AdminDetails;
