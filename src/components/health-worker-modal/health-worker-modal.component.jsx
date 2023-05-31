import React from "react";
import { useForm } from 'react-hook-form';
import "./health-worker-modal.css";

const HealthWorkerModal = () => {
    const {handleSubmit, register, reset,errors } = useForm([]);
    const registerHealthWorker =  (data) => {
    }
    return(
        <form onSubmit={handleSubmit(registerHealthWorker)} className="health-worker-form">
            <div className="inner">
                <div className="left-side">
                    <label>First Name</label>
                    <input type="text" name="firstname" {...register("firstname",{required: true})} />
                    <label>Title</label>
                    <select name="title" {...register("title",{required: true})}>
                        <option value="Dr">Dr.</option>
                    </select>
                    <label>Degree held (multiple degrees should be separated by commas)</label>
                    <input name="degree" {...register("degree",{required: true})} />
                    <label>Phone Number</label>
                    <input type="text" name="phone" {...register("phone", {required: true})}/>
                    <label className="state">Medical field</label>
                    <select name="medicalField" {...register("medicalField",{required: true})}>
                        <option value="psychiatrist">Psychiatrist</option>
                        <option value="psychologist">Psychologist</option>
                        <option value="marriageAndFamilyTherapist">Marriage and Family Therapist</option>
                        <option value="licensedProfessionalCounselor">Licensed Professional Counselor</option>
                        <option value="clinicalSocialWorker">Clinical Social Worker</option>
                        <option value="psychoanalyst">Psychoanalyst</option>
                        <option value="addictionCounselor">Addiction counselor</option>
                    </select>
                </div>
                <div className="right-side">
                    <label>Last name</label>
                    <input type="text" name="lastname" {...register("lastname",{required: true})}/>
                    <label>Email Address</label>
                    <input type="email" name="email"
                    {...register("email",{
                    required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "invalid email address" }
                    })}/>
                    {errors.email && errors.email.message}
                    <label className="description">Address</label>
                    <input type="text" name="address" {...register('address',{required: true})}/>
                    <label>License Number</label>
                    <input type="text" name="licenseNumber" {...register("licenseNumber", {required: true})}/>
                </div>
            </div>
            <hr />
            <div className="inner">
                <div className="left-side">
                    <h5>Current Job</h5>
                    <label>Name of institution</label>
                    <input type="text" name="currentName" {...register("currentName",{required: true})}/>
                    <label>Address</label>
                    <input type="text" name="currentAddress" {...register("currentAddress",{required: true})}/>
                    <label>Role</label>
                    <input type="text" name="currentRole" {...register({required: true})}/>
                </div>
                <div className="right-side">
                    <h5>Past Job (most recent)</h5>
                    <label>Name of institution</label>
                    <input type="text" name="formerName" {...register("formerName",{required: true})}/>
                    <label>Address</label>
                    <input type="text" name="formerAddress" {...register("formerAddress",{required: true})}/>
                    <label>Role</label>
                    <input type="text" name="formerRole" {...register("formerRole", {required: true})}/>
                </div>
            </div>
            <button className="register"> Register</button>
        </form>
    )
}
export default HealthWorkerModal;