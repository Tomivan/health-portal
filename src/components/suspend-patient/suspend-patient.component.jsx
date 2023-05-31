import React from "react";

const SuspendPatient = () => {
    const suspendPatient = (data) => {
        const status = stat === 'suspended' ? "suspended": "active"
        setIsLoading(true);
        fetch('https://freemind-api.herokuapp.com/v1/admin/customer/update-status' , {
            method: "put",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "id": patientId,
                "reason": data.reason,
                "status": status
                })
        })
        .then(resp => resp.json())
            .then(
                response => {
                setState(response.data)
                setIsLoading(false);
                setSuspendModalIsOpen(false);
                },
                err => {
                    console.log(err)
                }
            )

    }
    return(
        <form onSubmit={handleSubmit(suspendPatient)} className="suspend-form">
            <label>Reason</label>
            <textarea type="text" name="reason" onChange={handleChange} ref={register({required: "Required"})} className="input"/>
            <button className="login-button"> 
            {isLoading && (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            )} Send </button>
        </form>
    )
}

export default SuspendPatient;