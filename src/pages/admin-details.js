import React from "react";
import Sidebar from "../components/sidebar/sidebar.component";
import AdminDetails from "../components/admin-details/admin-details.component";

const AdminDetailsPage = () => {
    return(
        <div className="flex">
            <Sidebar />
            <AdminDetails />
        </div>
    )
}

export default AdminDetailsPage;