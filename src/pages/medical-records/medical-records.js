import React, {useState, useEffect} from 'react';
import { navigate } from '@reach/router';
import './medical-records.css';
import Layout from '../../components/layout/layout';
import ContentLoader from 'react-content-loader';

const MedicalRecords = (data) => {
    const [state, setState] = useState(null);
    useEffect(() => {
        fetch('https://freemind-api.herokuapp.com/v1/admin/customer/medical-records', {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        })
        .then(resp => resp.json())
            .then(
                response => {
                    console.log(response.data)
                    setState(response.data)
                    if(response.error === "Invalid token"){
                        navigate(`/`);
                    }
                },
                err => { 
                    console.log(err)
                }
            )
    }, [])
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
        <>
        <Layout />
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
        </>
    )
}

export default MedicalRecords;
