import React from "react";
import { useForm } from "react-hook-form";
import "./notify-health-worker.css";

const NotifyHealthWorker = () => {
    const {handleSubmit, handleChange, register, reset } = useForm([]);
    const sendNotification = (data) => {
        setIsLoading(true);
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
            )}Send </button>
        </form>
    )
}

export default NotifyHealthWorker;