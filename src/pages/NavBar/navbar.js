import React, { Component } from "react";
import Logo from "../../assets/logo.png";

class NavBar extends Component {
    render() {
        return <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" >   <img src={Logo} alt="logo" height={30} />   </a>
                </div>

            </div>
        </nav>
    }
}


export default NavBar