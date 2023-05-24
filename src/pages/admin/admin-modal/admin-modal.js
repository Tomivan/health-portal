import React from 'react';
import { useForm } from 'react-hook-form';
import './admin-modal.css';

const AdminModal = () => {
    const {handleSubmit, register, reset, errors } = useForm([]);
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
                <input type="text" name="fullName"  {...register("fullName",{required: true})} />
                <label>Phone Number</label>
                <input type="number" name="phoneNumber" {...register("phoneNumber", {required: true})}/>
                <label>Email Address</label>
                <input type="email" name="email"
                    {...register("email",{
                    required: true, 
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "invalid email address" }
                    })}/>
                    {errors.email && errors.email.message}
                <label className="role">Role</label>
                <select name="role" {...register("role",{required: true})}>
                <option value=""> Select role</option>
                <option value="admin">Admin</option>
                <option value="superAdmin">Super Admin</option>
                </select>
                <button className="register-admin"> Register</button>
            </form>
            </>
        )
}

export default AdminModal;
