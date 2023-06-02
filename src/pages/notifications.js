import React from "react";
import Sidebar from "../components/sidebar/sidebar.component";
import Notifications from "../components/notifications/notifications.component";

const NotificationsPage = () => {
    return(
        <div className="flex">
            <Sidebar />
            <Notifications />
        </div>
    )
}

export default NotificationsPage;