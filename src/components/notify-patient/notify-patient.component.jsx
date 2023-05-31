import React from "react";
import "./notify-patient.css";

const NotifyPatient = () => {
    const sendNotification = (data) => {
        setIsLoading(true);
        fetch('https://freemind-api.herokuapp.com/v1/admin/notification', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "user": patientId,
                "title": data.title,
                "body": data.body
                })
        })
        .then(resp => resp.json())
            .then(
                response => {
                    console.log(response.data)
                    setIsLoading(false);
                    if (response.success === true) {
                        alert("Message sent!");
                        reset();
                    } else {
                        return alert("Message not sent");
                    }
                },
                err => {
                    console.log(err)
                }
            )
    }
    return(
        <form onSubmit={handleSubmit(sendNotification)}className="notification-form">
            <label>Title</label>
            <input type="text" name="title" onChange={handleChange} ref={register({required: "Required"})} className="input"/>
            <label>Message</label>
            <textarea type="text" name="body" onChange={handleChange} ref={register({required: "Required"})} className="input"/>
            <button className="login-button">
            {isLoading && (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            )} Send </button>
        </form>
    )
}

export default NotifyPatient;