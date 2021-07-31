import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { navigate } from '@reach/router';
import './health-workers.css';
import Layout from '../../components/layout/layout';
import ContentLoader from 'react-content-loader';

const HealthWorkers = () => {
    const {handleSubmit, handleChange, register, reset,errors } = useForm([]);
    const [state, setState] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    useEffect(() => {
        fetch('https://freemind-api.herokuapp.com/v1/admin/workers', {
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
                    console.log(response.data);
                    setState(response.data)
                    if(response.error === "Invalid token"){
                        navigate(`/`);
                    }
                },
                err => { 
                    console.log(err)
                }
            )
    },[state])
    const registerHealthWorker =  (data) => {
        fetch('https://freemind-api.herokuapp.com/v1/admin/workers', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({
                "firstname": data.firstname,
                "lastname": data.lastname,
                "title": data.title,
                "email": data.email,
                "address": data.address,
                "degree": data.degree,
                "licenceNumber": data.licenseNumber,
                "phone": data.phone,
                "medicalField": data.medicalField
                })
            })
            .then(response => response.json())
            .then(data =>{
                if (data.success === true) {
                    alert("profile created!");
                    reset();
                }
            });
        }
    return (
        <>
            <Layout />
            <div className="health-section">
                <h2 className="heading">Health Workers</h2>

                {!state ? <div className="no-content">
                <ContentLoader />
                </div> :
                <div className="health-workers">
                {state ? <div className="total-card">
                        <h4>Total Health Workers</h4>
                        <p>{state.totalCount}</p>
                    </div> : undefined}
                    <button className="create-worker" onClick={() => setModalIsOpen(true)}> Create health worker</button>
                    <Modal className="bg-modal" isOpen={modalIsOpen}>
                        <div className="close-form" onClick={() => setModalIsOpen(false)}> + </div>
                        <form onSubmit={handleSubmit(registerHealthWorker)} className="health-worker-form">
                            <div className="inner">
                            <div className="left-side">
                                <label>First Name</label>
                                <input type="text" name="firstname" onChange={handleChange} ref={register({required: "Required"})} />
                                <label>Title</label>
                                <select name="title" onChange={handleChange} ref={register({required: "Required"})}>
                                    <option value="Dr">Dr.</option>
                                </select>
                                <label>Degree held (multiple degrees should be separated by commas)</label>
                                <input name="degree" onChange={handleChange} ref={register({required: "Required"})} />
                                <label>Phone Number</label>
                                <input type="text" name="phone" onChange={handleChange} ref={register({required: "Required"})}/>
                                <label className="state">Medical field</label>
                                <select name="medicalField" onChange={handleChange} ref={register({required: "Required"})}>
                                    <option value="Psychiatrist">Psychiatrist</option>
                                    <option value="Psychologist">Psychologist</option>
                                    <option value="Marriage & family Therapist">Marriage & Family Therapist</option>
                                    <option value="Licensed Professional counselor">Licensed Professional Counselor</option>
                                    <option value="Clinical Social Worker">Clinical Social Worker</option>
                                    <option value="Psychoanalyst">Psychoanalyst</option>
                                    <option value="Addiction counselor">Addiction counselor</option>
                                </select>
                            </div>
                            <div className="right-side">
                                <label>Last name</label>
                                <input type="text" name="lastname" onChange={handleChange} ref={register({required: "Required"})}/>
                                <label>Email Address</label>
                                <input type="email" name="email" onChange={handleChange}
                                        ref={register({
                                       required: "Required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                       message: "invalid email address" }
                                    })}/>
                                    {errors.email && errors.email.message}
                                <label className="description">Address</label>
                                <input type="text" name="address" onChange={handleChange} ref={register({required: "Required"})}/>
                                <label>License Number</label>
                                <input type="text" name="licenseNumber" onChange={handleChange} ref={register({required: "Required"})}/>
                            </div>
                            </div>
                            <hr />
                            <div className="inner">
                            <div className="left-side">
                                <h5>Current Job</h5>
                                <label>Name of institution</label>
                                <input type="text" name="licenseNumber" onChange={handleChange} ref={register({required: "Required"})}/>
                                <label>Address</label>
                                <input type="text" name="licenseNumber" onChange={handleChange} ref={register({required: "Required"})}/>
                                <label>Role</label>
                                <input type="text" name="licenseNumber" onChange={handleChange} ref={register({required: "Required"})}/>
                            </div>
                            <div className="right-side">
                                <h5>Past Job (most recent)</h5>
                                <label>Name of institution</label>
                                <input type="text" name="licenseNumber" onChange={handleChange} ref={register({required: "Required"})}/>
                                <label>Address</label>
                                <input type="text" name="licenseNumber" onChange={handleChange} ref={register({required: "Required"})}/>
                                <label>Role</label>
                                <input type="text" name="licenseNumber" onChange={handleChange} ref={register({required: "Required"})}/>
                            </div>
                            </div>

                            <button className="register"> Register</button>
                        </form>
                    </Modal>
                    <table className="health-worker-table">
                        <thead>
                            <tr className="table-row">
                                <th>Title</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email Address</th>
                                <th>Medical Field</th>
                                <th>Phone Number</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {state && state.workers.map( data => (<tr>
                                <td>{data.title}</td>
                                <td>{data.firstname}</td>
                                <td>{data.lastname}</td>
                                <td>{data.email}</td>
                                <td>{data.medicalField}</td>
                                <td>{data.phone}</td>
                                <td>{data.status}</td> 
                                <td><button className="view-details" onClick={() => navigate('/health-worker-details', {state: data})}>View full details</button></td>
                            </tr>))}
                    </tbody>
                    </table>
                </div>}
            </div>
        </>
    )
}

export default HealthWorkers;
