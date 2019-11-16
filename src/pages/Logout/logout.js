import React, { Component, Fragment } from "react";
import Dimensions from "react-dimensions";
import { withRouter } from "react-router-dom";
import { logout } from "../../services/auth";
import { withGlobalState } from 'react-globally'




class LogoutPage extends Component {

    componentDidMount() {
        logout();
        this.props.setGlobalState(prevGlobalState => ({
            usuario: {
                id: 0
            }
        }))
        this.props.history.push("/");
    }

    render() {
        return (
            <Fragment>
                <h4>Deslogando...</h4>
            </Fragment>
        );
    }
}

const LogoutPageConst = withGlobalState(withRouter(Dimensions()(LogoutPage)));
const Logout = () => (
    <Fragment>
        <LogoutPageConst />
    </Fragment>

);

export default Logout;
