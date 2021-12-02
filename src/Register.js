import axios from "axios";
import React from "react";
import { Component } from "react";

export default class Register extends Component{

    handleSubmit=(e)=>{
        e.preventDefault();
        const data={

            email:this.email,
            password:this.password,

        }
     axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCKtULSnWB5X49zvHqMR7XYrdQ0RdW8_H4",data).then(
         res=>{
             localStorage.setItem('token',res.data.idToken)
         }
     ).catch(
         err=>{
             console.log(err);
         }
     )
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <h3>sign up</h3>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" placeholder="first name"
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" placeholder="last name"
                  />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Email"
                    onChange={e=>this.email=e.target.value}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="password"
                    onChange={e=>this.password=e.target.value}/>
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Confirm Password"
                   />
                </div>
                <button className="btn btn-primary btn-block mt-3">submit</button>
            </form>
        )
    }
    
}