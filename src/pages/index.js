import React from 'react';
import { Router } from '@reach/router';
import Login from './login/login';
import Admin from './admin/admin';
import Dashboard from './dashboard/dashboard';
import HealthWorkers from './health-workers/health-workers';
import MedicalRecords from './medical-records/medical-records';
import Notifications from './notifications/notifications';
import Patients from './patients/patients';
import HealthworkerDetails from './health-workers/health-worker-details/health-worker-details';
import PatientDetails from './patients/patient-details/patient-details';
import AdminDetails from './admin/admin-details/admin-details';
import ForgotPassword from './login/forgot-password/forgot-password';
import ResetPassword from './login/reset-password/reset-password';
import Profile from './login/profile/profile';
import Prescription from './medical-records/prescriptions/prescriptions';
import Caretaker from './caretaker/caretaker';
import CaretakerDetails from './caretaker/caretaker-details/caretaker-details';

const Pages = () => {
    return(
        <Router>
            <Login exact path="/" />
            <Admin path="/admin" />
            <Dashboard path="/dashboard" />
            <HealthWorkers path="/health-workers" />
            <MedicalRecords path="/medical-records" />
            <Prescription path="/prescription" />
            <Notifications path="/notifications" />
            <Patients path="/patients" />
            <HealthworkerDetails path="/health-worker-details" />
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
