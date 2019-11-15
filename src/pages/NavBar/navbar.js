import React, { Component } from "react";
import Logo from "../../assets/logo.png";
import { logout } from "../../services/auth";

class NavBar extends Component {
    state = {
        navCollapsed: true
    }

    _onToggleNav = () => {
        this.setState({ navCollapsed: !this.state.navCollapsed })
    }

    handleLogout = e => {
        logout();
        this.props.history.push("/");
    };

    render() {
        const { navCollapsed } = this.state

        return (
            <nav className='navbar navbar-default'>
                <div className='navbar-header'>
                    <a className='navbar-brand' href='/app'><img src={Logo} height={25} alt="logo"></img></a>
                    <button
                        aria-expanded='false'
                        className='navbar-toggle collapsed'
                        onClick={this._onToggleNav}
                        type='button'
                    >
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                </div>
                <div
                    className={(navCollapsed ? 'collapse' : '') + ' navbar-collapse'}
                >
                    <ul className='nav navbar-nav navbar-right'>
                        <li>
                            <a><button type="button" onClick={this.handleLogout}>Logout</button></a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}



export default NavBar