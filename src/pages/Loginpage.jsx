import React from 'react'
import './login.css'
import { useState } from 'react';
import { LoginApi } from '../services/Api';
import { storeUserData } from '../services/Store';
import { isAuthenticated } from '../services/Auth';
import { Link, Navigate } from 'react-router-dom';
import Nav from '../component/Nav';


function Loginpage() {

    const initialStateErrors = {
        email: { required: false },
        password: { required: false },
        custom_error: null
    }
    const [errors, setErrors] = useState(initialStateErrors);

    const [lodding, setLodding] = useState(false);

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })

    const handleInput = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let errors = initialStateErrors;
        let hasError = false;
        if (inputs.email == "") {
            errors.email.required = true;
            hasError = true;
        }
        if (inputs.password == "") {
            errors.password.required = true;
            hasError = true;
        }
        if(hasError != true){
            setLodding(true)
            //Sending  login Api Requst
            LoginApi(inputs).then((response)=>{
             storeUserData(response.data.idToken)
            }).catch((err)=>{
               if(err.code = "ERR_BAD_REQUEST"){
                setErrors({...errors,custom_error:"Invalid_Requirments"})
               }
            }).finally(()=>{
                setLodding(false)
            })

        }

        setErrors({...errors});
    }

    if(isAuthenticated()){
        return <Navigate to ="/dashbord"/>
        }

    return (
        <div>
            <Nav/>
            <section className="login-block">
                <div className="container">
                    <div className="row ">
                        <div className="col login-sec">
                            <h2 className="text-center">Login Now</h2>
                            <form onSubmit={handleSubmit}action="">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                                    <input type="email" className="form-control" name="email" id=""  onChange={handleInput} placeholder="email" />
                                    {errors.email.required?
                                        (<span className="text-danger" >
                                            Email is required.
                                        </span>) : null
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                                    <input className="form-control" type="password" name="password" onChange={handleInput} placeholder="password" id="" />
                                    {errors.email.required?
                                        (<span className="text-danger" >
                                            Password is required.
                                        </span>) : null}
                                </div>

                                <div className="form-group">
                                    {lodding?
                                        (<div className="text-center">
                                            <div className="spinner-border text-primary " role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>) : null}
                                    <span className="text-danger" >
                                        {errors.custom_error?
                                            (<p>{errors.custom_error}</p>) : null
                                        }
                                    </span>
                                    <input type="submit" className="btn btn-login float-right" disabled = {lodding} value="Login" />
                                </div>

                                <div className="clearfix"></div>
                                <div className="form-group">
                                    Create new account ? Please <Link to="/register" >Register</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Loginpage