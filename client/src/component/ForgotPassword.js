import React, { useImperativeHandle, useState } from 'react';
import {PasswordReset}  from '../forms/PasswordReset';
import "../css/register.css";

export const ForgotPassword = () => {
  return(
    <div className="container mt-3">
      <div className="row">
        <div>
          <PasswordReset/> {/*//getting the signup form */}
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword;