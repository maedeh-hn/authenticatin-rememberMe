import React,{Component} from "react";
import { Link } from "react-router-dom";

export default class Nav extends Component{
    render(){
        return(
            <nav className="navbar navbar-expand navbar-light fixed-top">
            <div className="container">
              <Link to="/" className="navbar-brand">Home</Link>
              <div className="collapse navbar-collapse justify-content-end">
                <ul className="navbar-nav ml-auto d-flex justify-content-between" style={{width:"150px"}}>
                  <li className="nav-item">
                    <Link to="/login" className="nav-links">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-links">sign up</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )
    }
}