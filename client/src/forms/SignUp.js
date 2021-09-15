import React, { useImperativeHandle, useState } from 'react';
import { Formik, Form, useFormik } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import { NavLink, useHistory } from 'react-router-dom';
import {Alert} from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

//async function to send data to backend route and get the result status
async function saveTeacher(values,history){
    const res = await fetch('/codevault.com/teachers',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
          name:values.name,email:values.email,password:values.password
      })
  });
  //get the status return by route
  const data =  await res.json;
  console.log(res);
  //if error while user reigstration due to user email already present, password not matched or not all data fillec
  if(res.status===400){
      //window.alert("Please fill out all the details");
     toast.error("Please fill out all the detail's",{position:"top-center"});  
      return;
  }

  if(res.status===422 || !data){
      toast.warn("Email already exist's please login",{position:"top-center"});
      console.log("User registration failed");
      return;
  }
  else{
      // window.alert("Teacher registered successfully go and login")
      console.log("User regitration successfull");
      toast.success('Registration successful',{position:"top-center"});
      //now send user to login page
      history.push("/");
  }
}


export const Signup = () => {
  const history = useHistory();
    //this is validation schema to validate the user input in text forms
  const validate = Yup.object({
    name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('*Name is Required'),
    email: Yup.string()
      .email('*Email is invalid')
      .required('*Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 6 charaters')
      .max(20,'Password must be at most 20 characters')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&,<>.?|/\/~`^()]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .required('*Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('*Confirm password is required'),
  })

 

  return (
    <>
      <Formik
      //setting initial values of form fields
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={validate} //validating the schema with user input
        onSubmit={values =>  {
            console.log(values) //add the database and backend integration logic here
          //calling the route in backend
          saveTeacher(values,history);
        }}
      >
        {formik => (
          <div>
            <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>  
              {/* heading and below is form components */}
              
            <Form method="POST">
              <TextField label="First Name" name="name" placeholder="name" type="text" />
              <TextField label="Email" name="email" type="email" placeholder="email" />
              <TextField label="password" name="password" type="password" placeholder='password'/>
              <TextField label="Confirm Password" name="confirmPassword" type="password" placeholder="re-enter password" />
              <button className="btn btn-dark mt-3" type="submit">Register</button>
              <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
            </Form>
          </div>
        )}
      </Formik>
      <ToastContainer/>
    </>
  )
}