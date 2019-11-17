import React, { Component, Fragment } from "react";
import Dimensions from "react-dimensions";
import { withRouter } from "react-router-dom";
import { Container } from "./styles";
import NavBar from "../NavBar/navbar";
import { withGlobalState } from 'react-globally'
import api from "../../services/api";
import Swal from 'sweetalert2'

class HomePage extends Component {

  getUsuarioLogado = async e => {
    try {
      const respose = await api.get("api/usuarios/usuario-autenticado");
      this.props.setGlobalState(prevGlobalState => ({
        usuario: respose.data
      }))
    } catch (err) {
      if (err.response.data.status === 429 || err.response.data.status === 500) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message
        })
      } else {
        this.props.history.push("/logout");

      }
    }
  };

  componentDidMount() {
    if (this.props.globalState.usuario.id === 0)
      this.getUsuarioLogado();
  }

  render() {
    return (
      <Fragment>
        <NavBar {...this.props} />
        <Container>
          Olá, {this.props.globalState.usuario.nome}
        </Container>
      </Fragment>
    );
  }
}

const HomePageConst = withGlobalState(withRouter(Dimensions()(HomePage)));
const Home = () => (
  <Fragment>
    <HomePageConst />
  </Fragment>

);

export default Home;
