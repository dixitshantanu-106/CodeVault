import React,{Component} from 'react'
import {Route, Switch} from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Login from './component/Login';
import About from './component/About';
import Errorpage  from './component/Errorpage';
import Registration from './component/Registration';
import ForgotPassword from './component/ForgotPassword';
import CreateClass from './component/CreateClass';
import CreateExamComponent from './component/CreateExamComponent';
import "./App.css";
//import "./css/register.css";
import "./css/pagenotfound.css";
import "bootstrap/dist/css/bootstrap.css";  
import Contact from './component/Contact';
const App  = ()=>{
  return (
    //setting the state to check if user is logged in or not
      <>
        <Navbar/>
            <Switch>        
                <Route path="/registration">
                    <Registration/>
                </Route>
                <Route exact path="/">
                    <Login/>
                </Route>
                <Route path="/home">
                    <Home/>
                </Route>
                <Route path="/about">
                    <About/>
                </Route>
                <Route path="/contact">
                    <Contact/>
                </Route>
                <Route path="/forgotpassword">
                    <ForgotPassword/>
                </Route>
                <Route path="/createclass">
                    <CreateClass/>
                </Route>
                <Route path="/examcreate">
                    <CreateExamComponent/>
                </Route>
                <Route>
                    <Errorpage/>
                </Route>

            </Switch>
      </>
    
  )
}

export default App;