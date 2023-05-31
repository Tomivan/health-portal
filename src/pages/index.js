import React from 'react';
import { Router } from '@reach/router';
import Login from '../components/login/login.component';
import Admin from './admin';
import Dashboard from './dashboard';
import HealthWorkers from './health-workers';
import MedicalRecords from './medical-records';
import Notifications from './notifications';
import Patients from './patients';
import HealthWorkerDetails from './health-worker-details';
import PatientDetails from './patient-details';
import AdminDetails from './admin-details';
import ForgotPassword from '../components/forgot-password/forgot-password.component';
import ResetPassword from '../components/reset-password/reset-password.component';
import Profile from './profile';
import Prescriptions from './prescriptions';
import Caretaker from './caretaker';
import CaretakerDetails from './caretaker-details';

const Pages = () => {
    return(
        <Router>
            <Login exact path="/" />
            <Admin path="/admin" />
            <Dashboard path="/dashboard" />
            <HealthWorkers path="/health-workers" />
            <MedicalRecords path="/medical-records" />
            <Prescriptions path="/prescription" />
            <Notifications path="/notifications" />
            <Patients path="/patients" />
            <HealthWorkerDetails path="/health-worker-details" />
            <AdminDetails path="/admin-details" />
            <PatientDetails path="/patient-details" />
            <ForgotPassword path="/forgot-password" />
            <ResetPassword path="/reset-password" />
            <Profile path="/profile" />
            <Caretaker path="/caretaker" />
            <CaretakerDetails path="/caretaker-details" />
        </Router>
    )
}
export default Pages;
