import React from 'react';
import { useForm } from 'react-hook-form';
import './caretaker-modal.css';

const CaretakerModal = () => {
    const {handleSubmit, register, reset, errors } = useForm([]);
    const registerCaretaker =  (data) => {
        fetch('https://freemind-api.herokuapp.com/v1/admin/care-taker', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({
                "firstname": data.firstname,
                "lastname": data.lastname,
                "email": data.email,
                "phone": data.phone
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
            <form onSubmit={handleSubmit(registerCaretaker)} className="admin-form">
                <label>First Name</label>
                <input type="text" name="firstname" {...register("firstname",{required: true})} />
                <label>Last Name</label>
                <input type="text" name="lastname" {...register("lastname",{required: true})} />
                <label>Phone Number</label>
                <input type="number" name="phone" {...register("phone",{required: true})}/>
                <label>Email Address</label>
                <input type="email" name="email"
                    {...register("email",{
                    required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "invalid email address" }
                    })}/>
                    {errors.email && errors.email.message}
                <button className="register-admin"> Register</button>
            </form>
            </>
        )
}

export default CaretakerModal;
