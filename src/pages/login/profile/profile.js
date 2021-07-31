import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { navigate } from '@reach/router'
import './profile.css';
import Layout from '../../../components/layout/layout';

const Profile = (data) =>{
    const {handleSubmit, handleChange, register} = useForm([]);
    const [state, setState] = useState(null);
    const adminId = data._id;

    useEffect(() => {
        fetch('https://freemind-api.herokuapp.com/v1/admin/admin/' + adminId, {
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
                    setState(response.data)
                    if(response.error === "Invalid token"){
                        navigate(`/`);
                    }
                },
                err => { 
                    console.log(err)
                }
                
            )
    },[])
    const changePassword = () => {
        fetch('https://freemind-api.herokuapp.com/v1/admin/auth/update-password', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                password: data.password,
                newPassword: data.newPassword
                })
        })
        .then(resp => resp.json())
            .then(
                response => {
                    console.log(response.data)
                },
                err => { 
                    console.log(err)
                }
                
            )
    }
    return(
        <div>
            <Layout />
            <div className="prescription-section">
                <h2 className="heading">Profile</h2>
            </div>
            <div className="Profile">
            <form onSubmit={handleSubmit(changePassword)} className="profile-form">
                <p> Change your password</p>
                    <label>Password</label> 
                    <input type="password" name="password" onChange={handleChange} ref={register({required: "Required"})} className="profile-input"/>
                    <label>New Password</label>
                     <input type="password" name="newPassword" onChange={handleChange} ref={register({required: "Required"})} className="profile-input"/>
                <button className="profile-button"> Save Changes</button>
            </form>
        </div>
        </div>
    )
}

export default Profile;
