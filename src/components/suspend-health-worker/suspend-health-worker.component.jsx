import React from "react";

const SuspendHealthWorker = () => {
    const suspendHealthWorker = () => {
        const status = stat === 'suspended' ? "suspended": "active"
        setIsLoading(true);
    }
    return(
        <form onSubmit={handleSubmit(suspendHealthWorker)} className="suspend-form">
            <label>Reason</label>
            <textarea type="text" name="reason" onChange={handleChange} ref={register({required: "Required"})} className="input"/>
            <button className="login-button"> 
            {isLoading && (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            )}Send </button>
        </form>
    )
}

export default SuspendHealthWorker;