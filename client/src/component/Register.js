import React, {useState} from 'react'
import singinimg from '../images/signin-image.jpg';
import { NavLink, useHistory } from 'react-router-dom';

const Register = ()=>{
    //creating history variable to send control to login page
    const history = useHistory();


    const [user,setUser] = useState({
        name:"",
        email:"",
        password:""
    }); 

    let name,value;

    //this is used to get data from the field and store into reactstate
    const handleInputs = (e)=>{
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        //saving the values into state
        setUser({...user, [name]:value});
    }

    //method to get data store into state and call the route from routes folder
    const PostData = async(e)=>{
       
        e.preventDefault();
        const {name,email,password} = user;
      
        const res = await fetch('/codevault.com/teachers',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                name,email,password
            })
        });
        window.alert("On line no 41:"+res.status);
        //get the status return by route
        const data = await res.json;
        
        //if error while user reigstration due to user email already present, password not matched or not all data fillec
        if(res.status===400){
            window.alert("Please fill out all the details");
            return;
        }
        
        if(res.status===422 || !data){
            window.alert("Teacjer already present with this email id");
            console.log("User registration failed");
        }
        else{
            window.alert("Teacher registered successfully go and login");
            console.log("User regitration successfull");
            //now send user to login page
            history.push("/");
        }
    }

    return(
        <div class="main">
        <section class="signup">
            <div class="container">
                <div class="signup-content">
                    <div class="signup-form">
                        <h2 class="form-title">Teacher Sign up</h2>
                        <form method="POST" class="register-form" id="register-form">
                            <div class="form-group">
                                <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="name" id="name"
                                 value={user.name}
                                 onChange={handleInputs}
                                 placeholder="Your Name"/>
                            </div>
                            <div class="form-group">
                                <label for="email"><i class="zmdi zmdi-email material-icons-name"></i></label>
                                <input type="email" name="email" id="email"
                                  value={user.email}
                                  onChange={handleInputs}
                                 placeholder="Your Email"/>
                            </div>
                            <div class="form-group">
                                <label for="pass"><i class="zmdi zmdi-lock material-icons-name"></i></label>
                                <input type="password" name="password" id="pass"
                                 value={user.pass2ord}
                                 onChange={handleInputs}
                                 placeholder="Password"/>
                            </div>
                            <div class="form-group">
                                <label for="re-pass"><i class="zmdi zmdi-lock-outline material-icons-name"></i></label>
                                <input type="password" name="repassword" id="re_pass" placeholder="Repeat your password"/>
                            </div>
                            <div class="form-group form-button">
                                <input type="submit" name="signup" id="signup" class="form-submit" value="Register" onClick={PostData}/>
                            </div>
                        </form>
                    </div>
                    <div class="signup-image">
                        <figure><img src={singinimg} alt="sing up image"/></figure>
                        <NavLink to="/" class="signup-image-link">I am already member</NavLink>
                    </div>
                </div>
            </div>
        </section>
    </div>


    )
}

export default Register;