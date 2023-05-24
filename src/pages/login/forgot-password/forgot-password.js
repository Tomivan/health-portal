import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from '@reach/router';
import './forgot-password.css';

const ForgotPassword = () => {
    const {handleSubmit, register} = useForm([]);
    const [isLoading, setIsLoading] = useState(false);
    const forgotPassword = (data) => {
        setIsLoading(true);
        fetch('https://freemind-api.herokuapp.com/v1/admin/auth/forgot-password',  {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //make sure to serialize your JSON body
            body: JSON.stringify({
                email: data.email
                })
        })
        .then(resp => resp.json())
            .then(
                data => {
                    console.log(data)
                    alert("Email sent!");
                    setIsLoading(false);
                },
                err => {
                    console.log(err)
                }
            )
    }
    return (
        <div>
             <form onSubmit={handleSubmit(forgotPassword)}className="password-form">
                <h3>Forgot password</h3>
                <label>Email address</label>
                <input type="text" name="email" {...register("email",{required: true})} className="input"/>
                <button className="login-button"> 
                {isLoading && (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                )} Send Email</button>
                <div className="account">Have an account?<Link to="/" className="login-link">Login</Link></div>
            </form>
        </div>
    )
}

export default ForgotPassword;
