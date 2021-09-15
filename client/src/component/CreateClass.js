import React from 'react';
import LinearStepper from "../forms/LinearStepper";
import { CssBaseline, Container, Paper, Box } from "@material-ui/core";
import {NavLink} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const CreateClass = ()=>{
    console.log(localStorage.getItem('token'));

    const tk = localStorage.getItem('token');
    if(tk){
        return(
            <>
            <CssBaseline />
            <Container component={Box} p={4}>
                <Paper component={Box} p={3}>
                <LinearStepper />
                </Paper>
            </Container>
          </>
        );
    }
    else{
        return(
            <>
           <div>
               <h1>You are not authorized to access this page please<NavLink className="nav-link" to="/">Login</NavLink></h1>
           </div>
           <ToastContainer/>
           </>

        )
    }
}

export default CreateClass;