import React from "react";
import Sidebar from "../components/sidebar/sidebar.component";
import HealthworkerDetails from "../components/health-worker-details/health-worker-details.component";

const HealthWorkerDetailsPage = () => {
    return(
        <div className="flex">
            <Sidebar />
            <HealthworkerDetails />
        </div>
    )
}

export default HealthWorkerDetailsPage;