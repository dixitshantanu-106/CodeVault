import React, {useState} from 'react'
import singinimg from '../images/signup-image.jpg';
import { NavLink, useHistory } from 'react-router-dom';
import "../css/register.css";
import { oneOf } from 'prop-types';
import {Signup} from '../forms/SignUp';

const Registration = ()=>{
    return(
        <div className="container mt-3">
      <div className="row">
        <div className="col-md-5">
           <Signup /> {/*//getting the signup form */}
        </div>
        <div className="col-md-7 my-auto">
          <img className="img-fluid image" src={singinimg} alt="signinimg"/>
        </div>
      </div>
    </div>
    
    );
}

export default Registration;