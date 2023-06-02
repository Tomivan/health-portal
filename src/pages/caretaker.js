import React from "react";
import Sidebar from "../components/sidebar/sidebar.component";
import Caretaker from "../components/caretaker/caretaker.component";

const CaretakerPage = () => {
    return(
        <div className="flex">
            <Sidebar />
            <Caretaker />
        </div>
    )
}

export default CaretakerPage;