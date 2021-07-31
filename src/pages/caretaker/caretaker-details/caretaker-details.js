import React, { useState } from 'react';
import { Link, navigate } from '@reach/router';
import './caretaker-details.css'
import Layout from '../../../components/layout/layout';

const CaretakerDetails = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const data = props.location.state;
    const caretakerId = data._id;
    const deleteCaretaker = () => {
        setIsLoading(true);
        fetch('https://freemind-api.herokuapp.com/v1/admin/care-taker/' + caretakerId, {
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
                        navigate('/caretaker')
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
                <Link to="/caretaker">Back</Link>
                </div>
                <div className="profile-container">
                    <table>
                        <tr>
                            <td>First Name</td>
                            <td>{data.firstname}</td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td>{data.lastname}</td>
                        </tr>
                        <tr>
                            <td>Email Address</td>
                            <td>{data.email}</td>
                        </tr>
                        <tr>
                            <td>Role</td>
                            <td>{data.phone}</td>
                        </tr>
                    </table>
                    <button className="delete" onClick={deleteCaretaker}>
                    {isLoading && (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                    )}Delete Caretaker</button>
                </div>
            </div>
        </div>
    )
}

export default CaretakerDetails;
