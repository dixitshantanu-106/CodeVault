import React ,{ useImperativeHandle, useState,useEffect,Component } from 'react';
import { Formik, Form, useFormik } from 'formik';
import {TextField} from './TextField';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import lockgiphy from '../images/lock_giphy.gif';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "../css/register.css";


//calling forgot password api from backend using axios 
async function forgotPassword(values,setLoading){
    console.log("In forgotPassword method"+values.email);
    try{
      setLoading(true);
      axios.post('/codevault.com/teachers/forgotpassword',values)
      .then(res=>{
          toast.success("New password sent through email\n Please login",{position:"top-center"});
         })
      .catch(err=>{toast.error('Error while resetting password',{position:"top-center"});console.log(err);})
      setLoading(false);
    }
    catch(ex){
      console.log(ex);
    }

}

export const PasswordReset = () =>{
    //const history = useHistory();
    //this is validation schema to validate the user input in text forms
  const [loading,setLoading] = useState(false);

  const validate = Yup.object({
    email: Yup.string()
      .email('*Email is invalid')
      .required('*Email is required'),
  })

  return (
    <>
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-5">
            <Formik
                //setting initial values of form fields
                    initialValues={{
                    email: '',
                    }}
                    validationSchema={validate} //validating the schema with user input
                    onSubmit={values =>  {
                        console.log(values) //add the database and backend integration logic here
                        forgotPassword(values,setLoading); //calling method to forgot password
                    }}
             >
                {formik => (
                <div>
                    <h1 className="my-4 font-weight-bold .display-4">Forgot Password</h1>  
                    {/* heading and below is form components */}
                    <Form method="POST">
                    <TextField label="Email" name="email" type="email" placeholder="email" />
                    <button className="btn btn-dark mt-3" type="submit">
                    {loading?(<Loader animation="border"/> ):"Send Reset Password"}</button>
                    <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
                    </Form>
                </div>
                )}
             </Formik>
            </div>
        <div className="col-md-7 my-auto">
          <img className="giphy" src={lockgiphy} alt="lockgiphy"/>
        </div>
      </div>
    </div>
      <ToastContainer/>
    </>
  )
}