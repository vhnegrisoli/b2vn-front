import React, { Component, Fragment } from "react";
import Dimensions from "react-dimensions";
import { withRouter } from "react-router-dom";
import api from "../../services/api";



import { Container } from "./styles";
import NavBar from "../NavBar/navbar";

class GrantAdminPage extends Component {

  render() {
    return (
      <Fragment>
        <NavBar {...this.props} />
        <Container>
          IHU AQUI TU TA ADMIN PROS OUTRO
        </Container>
      </Fragment>
    );
  }
}

const GrantAdminPageConst = withRouter(Dimensions()(GrantAdminPage));
const GrantAdmin = () => (
  <Fragment>
    <GrantAdminPageConst />
  </Fragment>

);

export default GrantAdmin;
