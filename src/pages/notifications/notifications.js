import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './notifications.css';
import Layout from '../../components/layout/layout';

const Notifications = () => {
    const {handleSubmit, handleChange, register, reset } = useForm([]);
    const [isLoading, setIsLoading] = useState(false);
    const sendNotification =  (data) => {
        setIsLoading(true);
        fetch('https://freemind-api.herokuapp.com/v1/admin/notification/all', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({
                "title": data.title,
                "body": data.body
                })
            })
            .then(response => response.json())
            .then(data =>{
                if (data.success === true) {
                    setIsLoading(false);
                    alert("message sent!");
                    reset();
                }
            });
        }
    return (
        <>
        <Layout />
        <div className="notification-section">
            <h2 className="heading">Notifications</h2>
        </div>
        <div className="notification">
        <form onSubmit={handleSubmit(sendNotification)} className="form">
            <label>Title</label>
            <input type="text" name="title" onChange={handleChange} ref={register({required: "Required"})} className="n-input"/>
            <label>Message</label>
            <textarea type="text" name="body" onChange={handleChange} ref={register({required: "Required"})} className="n-input"/>
            <button className="n-button">
               {isLoading && (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                )} Send </button>
        </form>
        </div>
        </>
    )
}

export default Notifications;
