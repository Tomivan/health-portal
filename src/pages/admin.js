import React from "react";
import Sidebar from "../components/sidebar/sidebar.component";
import Admin from "../components/admin/admin.component";

const AdminPage = () => {
    return(
        <div className="flex"> 
            <Sidebar />
            <Admin />
        </div>
    )
}

export default AdminPage;