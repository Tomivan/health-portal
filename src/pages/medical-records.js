import React from "react";
import Sidebar from "../components/sidebar/sidebar.component";
import MedicalRecords from "../components/medical-records/medical-records.component";

const MedicalRecordsPage = () => {
    return(
        <div>
            <Sidebar />
            <MedicalRecords />
        </div>
    )
}

export default MedicalRecordsPage;