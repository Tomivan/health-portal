import React from 'react';
import { useForm } from 'react-hook-form';
import './profile.css';

const Profile = (data) =>{
    const {handleSubmit, register} = useForm([]);
    const adminId = data._id;

    const changePassword = () => {
        fetch('https://freemind-api.herokuapp.com/v1/admin/auth/update-password', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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
            <div className="prescription-section">
                <h2 className="heading">Profile</h2>
            </div>
            <div className="Profile">
            <form onSubmit={handleSubmit(changePassword)} className="profile-form">
                <p> Change your password</p>
                    <label>Password</label> 
                    <input type="password" name="password" {...register("password",{required: true})} className="profile-input"/>
                    <label>New Password</label>
                     <input type="password" name="newPassword" {...register("newPassword",{required: true})} className="profile-input"/>
                <button className="profile-button"> Save Changes</button>
            </form>
        </div>
        </div>
    )
}

export default Profile;
