import React from "react";
import Sidebar from "../components/sidebar/sidebar.component";
import Profile from "../components/profile/profile.component";

const ProfilePage = () => {
    return(
        <div className="flex">
            <Sidebar />
            <Profile />
        </div>
    )
}

export default ProfilePage;