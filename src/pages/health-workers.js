import React from "react";
import Sidebar from "../components/sidebar/sidebar.component";
import HealthWorkers from "../components/health-workers/health-workers.component";

const HealthWorkersPage = () => {
    return(
        <div className="flex">
            <Sidebar />
            <HealthWorkers />
        </div>
    )
}

export default HealthWorkersPage;