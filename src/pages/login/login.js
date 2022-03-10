import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, navigate } from '@reach/router';
import './login.css';

const LoginForm = () => {
    const {handleSubmit, handleChange, register} = useForm([]);
    const [isLoading, setIsLoading] = useState(false);
    const login = (data) => {
        setIsLoading(true);
        fetch('https://freemind-api.herokuapp.com/v1/admin/auth/login', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
                })
            })
            .then((response) => (
                response.json()))
            .then((data) => {
                localStorage.setItem('token', data.token);
                setIsLoading(false);
                if(data.success === true){
                    navigate(`/dashboard`);
                } else {
                    return alert("Invalid email/password");
                }
            })
        }

    return(
        <div>
             <form onSubmit={handleSubmit(login)}className="login-form">
                <h3>Login</h3>
                <label>Email address</label>
                <input type="text" name="email" onChange={handleChange} ref={register({required: "Required"})} className="input"/>
                <label>Password</label>
                <input type="password" name="password" onChange={handleChange} ref={register({required: "Required"})} className="input"/>
                <button className="login-button" disabled={isLoading}> 
                {isLoading && (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                )}
                Login </button>
                <div className="password"> <Link to="/forgot-password" className="password-link">Forgot your password?</Link></div>
            </form> 

        </div>
    )
}

export default LoginForm;
