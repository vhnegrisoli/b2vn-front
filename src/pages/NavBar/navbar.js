import React, { Component } from "react";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";


class NavBar extends Component {
    state = {
        navCollapsed: true
    }

    _onToggleNav = () => {
        this.setState({ navCollapsed: !this.state.navCollapsed })
    }



    render() {
        const { navCollapsed } = this.state

        return (
            <nav className='navbar navbar-default'>
                <div className='navbar-header'>
                    <a className='navbar-brand' href='/home'><img src={Logo} height={25} alt="logo"></img></a>
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
                    <ul className='nav navbar-nav navbar-left'>
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/mapa">Mapa</Link>
                        </li>
                        <li>
                            <Link to="/grant-admin">Tornar Admin</Link>
                        </li>
                    </ul>
                    <ul className='nav navbar-nav navbar-right'>

                        <li>
                            <Link to="/logout">Logout</Link>
                        </li>

                    </ul>
                </div>
            </nav>
        )
    }
}



export default NavBar