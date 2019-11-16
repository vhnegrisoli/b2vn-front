import React, { Component, Fragment } from "react";
import Dimensions from "react-dimensions";
import { withRouter } from "react-router-dom";
import { logout } from "../../services/auth";





class LogoutPage extends Component {

    componentDidMount() {
        logout();
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

const LogoutPageConst = withRouter(Dimensions()(LogoutPage));
const Logout = () => (
    <Fragment>
        <LogoutPageConst />
    </Fragment>

);

export default Logout;
