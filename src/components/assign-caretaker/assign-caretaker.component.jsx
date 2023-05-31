import React from "react";

const AssignCaretaker = () => {
    const assignWorker = (data) => {
        setIsLoading(true);
        fetch('https://freemind-api.herokuapp.com/v1/admin/customer/assign-caretaker', {
            method: "put",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "caretaker": data.role,
                "customer": patientId
                })
        })
        .then(resp => resp.json())
            .then(
                response => {
                    setWorkerState(response.data)
                    console.log(workerState.assignedCaretaker)
                    setIsLoading(false);
                    setModalIsOpen(false);
                    if (response.success === true) {
                        alert("Worker assigned!");
                    } else {
                        return alert("Oops! something went wrong, try again");
                    }
                },
                err => {
                    console.log(err)
                }
            )
    }
    return(
        <form onSubmit={handleSubmit(assignWorker)}className="assign-form">
            <label className="role">Caretaker</label>
            <select name="role" onChange={handleChange} ref={register({required: "Required"})}>
                <option value=""> Select caretaker</option>
                {caretakerState && caretakerState.map( data => (
                <option key={data._id} value={data._id}>
                    {data.firstname} {data.lastname}
                </option>))}
            </select>
            <button className="login-button">
                {isLoading && (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            )} Assign </button>
        </form>
    )
}

export default AssignCaretaker;