import React, {useState } from 'react';
import { navigate } from '@reach/router';
import ContentLoader from 'react-content-loader';
import './medical-records.css';

const MedicalRecords = (data) => {
    const [state, setState] = useState(null);
    const fileURL = data.attachment
    const download = () => {
        fetch('https://freemind-api.herokuapp.com/v1/admin/customer/medical-records/' + fileURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/pdf',
            },
        })
        .then((response) => response.blob())
        .then((blob) => {
    const url = window.URL.createObjectURL(
      new Blob([blob]),
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `file.pdf`,
    );
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    });
    }
    return (
        <div>
            <div className="medical-section">
                <h2 className="heading">Medical Records</h2>
            </div>
            {!state ?<div className="no-content">
            <ContentLoader />
            </div> :
            <table className="medical-table">
                <thead>
                    <tr className="table-row">
                        <th>Health Worker</th>
                        <th>Patient</th>
                        <th>Medical Note</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {state && state.map( data => (<tr>
                    <td>{data.worker}</td>
                    <td>{data.customer}</td>
                    <td>{data.note}</td>
                    <td><button className="view-details" onClick={() => navigate('/prescription', {state: data})}>View prescription</button></td>
                    <td><button className="view-details" onClick={download}>Download File</button></td>
                    </tr>))}
                </tbody>
            </table>}
        </div>
    )
}

export default MedicalRecords;
