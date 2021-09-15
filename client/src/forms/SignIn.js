import React, { useImperativeHandle, useState } from 'react';
import axios from 'axios';
import { Formik, Form, useFormik } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import {useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//using axios login logic
async function loginTeacher(values,history){
    axios.post('/codevault.com/teachers/login',values)
        .then(res=>{
            console.log(res.headers['xauthheader']);
            localStorage.setItem('token',res.headers['xauthheader']);
            history.push('/home')})
        .catch(err=>{toast.error('Login failed',{position:"top-center"})}) 
}

export const Signin = () => {
  const history = useHistory();
    //this is validation schema to validate the user input in text forms
  const validate = Yup.object({
    email: Yup.string()
      .email('*Email is invalid')
      .required('*Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 6 charaters')
      .max(20,'Password must be at most 20 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      )
      .required('*Password is required')
  })

  return (
    <>
    <Formik
    //setting initial values of form fields
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={validate} //validating the schema with user input
      onSubmit={values =>  {
          console.log(values) //add the database and backend integration logic here
        //calling the route in backend
        loginTeacher(values,history);
      }}
    >
      {formik => (
        <div>
          <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>  
            {/* heading and below is form components */}
            
          <Form method="POST">
            <TextField label="Email" name="email" type="email" placeholder="email" />
            <TextField label="password" name="password" type="password" placeholder='password'/>
            <button className="btn btn-dark mt-3" type="submit">Login</button>
            <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
          </Form>
        </div>
      )}
    </Formik>
    <ToastContainer/>   
    </>
  )
}