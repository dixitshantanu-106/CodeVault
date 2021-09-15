import React from 'react';
import "../css/register.css";
import singinimg from '../images/signin-image.jpg';
import {Signin} from '../forms/SignIn.js';
import { NavLink } from 'react-router-dom';
const Login = ()=>{
    return(
        <div className="container mt-3">
        <div className="row">
          <div className="col-md-5">
             <Signin /> {/*getting the signIn form */}
             <div className="forgotpw">
               <NavLink to="/forgotpassword" >forgot password?</NavLink>
             </div>
          </div>
          <div className="col-md-7 my-auto">
            <img className="img-fluid image" src={singinimg} alt="signinimg"/>
          </div>
        </div>
      </div>
    )
}

export default Login;