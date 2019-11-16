import React, { Component, Fragment } from "react";
import Dimensions from "react-dimensions";
import { withRouter } from "react-router-dom";
import api from "../../services/api";
import { withGlobalState } from 'react-globally'
import { Container } from "./styles";
import NavBar from "../NavBar/navbar";

class GrantAdminPage extends Component {

  getUsuarioLogado = async e => {
    try {
      const respose = await api.get("api/usuarios/usuario-autenticado");
      console.log(respose.data)
      this.props.setGlobalState(prevGlobalState => ({
        usuario: respose.data
      }))
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.getUsuarioLogado();
  }


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

const GrantAdminPageConst = withGlobalState(withRouter(Dimensions()(GrantAdminPage)));
const GrantAdmin = () => (
  <Fragment>
    <GrantAdminPageConst />
  </Fragment>

);

export default GrantAdmin;
