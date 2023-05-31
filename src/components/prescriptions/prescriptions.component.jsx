import React from 'react';
import { Link } from '@reach/router';
import './prescriptions.css';

const Prescription = (props) =>{
    const data = props.location.state;
    return(
        <div>
            <div className="profile">
                <h2 className="heading">Prescription</h2>
                <div className="back-link">
                <Link to="/medical-records">Back</Link>
                </div>
                <div className="profile-container">
                    <table>
                        <tr>
                            <td>Name</td>
                            <td className="second">{data.prescription[0].name}</td>
                        </tr>
                        <tr>
                            <td>Dosage</td>
                            <td className="second">{data.prescription[0].dosage}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Prescription;
