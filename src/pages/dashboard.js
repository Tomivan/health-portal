import React from "react";
import Sidebar from "../components/sidebar/sidebar.component";
import Dashboard from "../components/dashboard/dashboard.component";

const DashboardPage = () => {
    return(
        <div className="flex">
            <Sidebar />
            <Dashboard />
        </div>
    )
}

export default DashboardPage;