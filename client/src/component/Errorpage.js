import React from 'react'
import {NavLink} from 'react-router-dom'

const Errorpage = () =>{
    return (
        <>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>404</h1>
                    </div>
                    <h2>We are sorry, page you requested not found..!!</h2>
                    <p>
                        This page you are looking for might have been removed or 
                        its name changed or is temporarily unavailable.
                    </p>
                    <NavLink to="/">Back to login page</NavLink>
                </div>
            </div>
        </>
    )
}

export default Errorpage;