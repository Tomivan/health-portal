import React from "react";
import Sidebar from "../components/sidebar/sidebar.component";
import CaretakerDetails from "../components/caretaker-details/caretaker-details.component";

const CaretakerDetailsPage = () => {
    return(
        <div className="flex">
            <Sidebar />
            <CaretakerDetails />
        </div>
    )
}

export default CaretakerDetailsPage;