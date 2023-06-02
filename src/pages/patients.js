import React from "react";
import Sidebar from "../components/sidebar/sidebar.component";
import Patients from "../components/patients/patients.component";

const PatientsPage = () => {
    return(
        <div className="flex">
            <Sidebar />
            <Patients />
        </div>
    )
}

export default PatientsPage;