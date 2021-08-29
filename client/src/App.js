import React from 'react'
import {Route, Switch} from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Login from './component/Login';
import Register from './component/Register';
import About from './component/About';
import Errorpage  from './component/Errorpage';
import "./App.css";
import "./css/register.css";
import "./css/pagenotfound.css";
import "bootstrap/dist/css/bootstrap.css";  
import Contact from './component/Contact';
const App = ()=>{
  return (
      <>
        <Navbar/>
        <Switch>

        
        <Route path="/registration">
            <Register/>
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
        <Route>
            <Errorpage/>
        </Route>

        </Switch>
      </>
    
  )
}

export default App;