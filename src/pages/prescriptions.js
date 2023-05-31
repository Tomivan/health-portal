import React from "react";
import Sidebar from "../components/sidebar/sidebar.component";
import Prescription from "../components/prescriptions/prescriptions.component";

const PrescriptionsPage = () => {
    return(
        <div>
            <Sidebar />
            <Prescription />
        </div>
    )
}

export default PrescriptionsPage;