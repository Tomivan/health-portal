import React from "react";
import Sidebar from "../components/sidebar/sidebar.component";
import PatientDetails from "../components/patient-details/patient-details.component";

const PatientDetailsPage = () => {
    return(
        <div className="flex">
            <Sidebar />
            <PatientDetails />
        </div>
    )
}

export default PatientDetailsPage;