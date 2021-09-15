import React,{Component, useEffect} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Home = ()=>{
    console.log(localStorage.getItem('token'));

    const tk = localStorage.getItem('token');
    console.log(tk);
    if(tk){
        return(
                <>
                <div>
                    <h1>This is home page will be modified</h1>
                    <h3>Stay tuned..!!</h3>
                </div>
                <div>
                    <NavLink to="/createclass">Create Class</NavLink>
                </div>
                <div>
                    <NavLink to="/examcreate">Create Exam</NavLink>
                </div>
                <ToastContainer/>
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

export default Home;