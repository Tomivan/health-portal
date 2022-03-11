import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { navigate } from '@reach/router';
import './reset-password.css';

const ResetPassword = (data) => {
    const {handleSubmit, register} = useForm([]);
    const [isLoading, setIsLoading] = useState(false);
    const resetPassword = (data) => {
        setIsLoading(true);
        fetch('https://freemind-api.herokuapp.com/v1/admin/dashboard',  {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            //make sure to serialize your JSON body
            body: JSON.stringify({
                password: data.password
                })
        })
        .then(resp => resp.json())
            .then(
                data => {
                    alert("Password saved!");
                    setIsLoading(false);
                    if(data.success === true){
                        navigate(`/`);
                    } else {
                        return alert("Try again");
                    }
                },
                err => {
                    console.log(err)
                }
            )
    }
    return (
        <div>
             <form onSubmit={handleSubmit(resetPassword)}className="password-form">
                <h3>Reset password</h3>
                <label>Password</label>
                <input type="text" name="password" {...register("password",{required: true})} className="input"/>
                <button className="login-button">  {isLoading && (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                )}Reset Password</button>
            </form>
        </div>
    )
}

export default ResetPassword;
