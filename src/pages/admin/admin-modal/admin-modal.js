import React, {useState, useEffect } from 'react';
import { navigate } from '@reach/router'
import { useForm } from 'react-hook-form';
import './admin-modal.css';

const AdminModal = () => {
    const {handleSubmit, handleChange, register, reset, errors } = useForm([]);
    const [state, setState] = useState(null);
    useEffect(() => {
        fetch('https://freemind-api.herokuapp.com/v1/admin/roles/all',  {
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
                    setState(response)
                    if(response.error === "Invalid token"){
                        navigate(`/`);
                    }
                },
                err => {
                    console.log(err)
                }
            )
    }, [])
    const registerAdmin =  (data) => {
        fetch('https://freemind-api.herokuapp.com/v1/admin/admin/create', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({
                "fullName": data.fullName,
                "email": data.email,
                "phoneNumber": data.phoneNumber,
                "role": data.role
                })
            })
            .then(response => response.json())
            .then(data =>{
                if (data.success === true) {
                    alert("profile created!");
                    reset();
                } else {
                    alert("profile not created");
                }
            });
        console.log(data)
        }
        return (
            <>
            <form onSubmit={handleSubmit(registerAdmin)} className="admin-form">
                <label>Full Name</label>
                <input type="text" name="fullName" onChange={handleChange} ref={register({required: "Required"})} />
                <label>Phone Number</label>
                <input type="text" name="phoneNumber" onChange={handleChange} ref={register({required: "Required"})}/>
                <label>Email Address</label>
                <input type="email" name="email" onChange={handleChange}
                    ref={register({
                    required: "Required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "invalid email address" }
                    })}/>
                    {errors.email && errors.email.message}
                <label className="role">Role</label>
                <select name="role" onChange={handleChange} ref={register({required: "Required"})}>
                <option value=""> Select role</option>
                {state && state.data.map( data => (
                <option key={data._id} value={data._id}>
                    {data.name}
                </option>))}
                </select>
                <button className="register-admin"> Register</button>
            </form>
            </>
        )
}

export default AdminModal;
