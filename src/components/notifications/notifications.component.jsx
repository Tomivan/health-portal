import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './notifications.css';

const Notifications = () => {
    const {handleSubmit, register, reset } = useForm([]);
    const [isLoading, setIsLoading] = useState(false);
    const sendNotification =  (data) => {
        setIsLoading(true);
        fetch('https://freemind-api.herokuapp.com/v1/admin/notification/all', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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
        <div>
            <div className="notification-section">
                <h2 className="heading">Notifications</h2>
            </div>
            <div className="notification">
                <form onSubmit={handleSubmit(sendNotification)} className="form">
                    <label>Title</label>
                    <input type="text" name="title" {...register("title",{required: true})} className="n-input"/>
                    <label>Message</label>
                    <textarea type="text" name="body" {...register("body",{required: true})} className="n-input"/>
                    <button className="n-button">
                    {isLoading && (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                        )} Send </button>
                </form>
            </div>
        </div>
    )
}

export default Notifications;
