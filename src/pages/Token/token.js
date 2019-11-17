import React, { Component, Fragment } from "react";
import Dimensions from "react-dimensions";
import { withRouter } from "react-router-dom";
import { getToken } from "../../services/auth";
import { Container } from "./styles";
import NavBar from "../NavBar/navbar";
import { withGlobalState } from 'react-globally'
import api from "../../services/api";
import Swal from 'sweetalert2'

const token = getToken();
class TokenPage extends Component {

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
          <h3>Veja seu token abaixo.</h3>
          <a style={{ backgroundColor: "#000000", color: "#FFFFFF", fontSize: 32, padding: 8 }}>{token}</a>
          <div style={{ padding: 8 }}>
            <h4>Para obter um token utilize a <i>end-point</i>: <a style={{ backgroundColor: "#808080", color: "#FFFFFF", fontSize: 18, padding: 8 }}><i>/oauth/token</i></a></h4>
          </div>
          <div style={{ padding: 8 }}>
            <h4>Utilize o método <a style={{ backgroundColor: "#228b22", color: "#FFFFFF", fontSize: 18, padding: 8 }}><b>POST</b></a></h4>
          </div>
          <div style={{ padding: 8 }}>
            <h4>Com os <i>Headers</i>: </h4>
            <h5>Authorization: Bearer YjJ2bi1hdXRoLWFwaS1jbGllbnQ= (token de autorização)</h5>
            <h5>Content-Type: application/x-www-form-urlencoded (tipo do envio)</h5>
          </div>
          <div style={{ padding: 8 }}>
            <h4>Por fim, no <i>body</i>: </h4>
            <h5>{'{'}</h5>
            <div style={{ paddingLeft: 18 }}>
              <h5>client_id: b2vn-auth-api-client (client da aplicação)</h5>
              <h5>client_secret: b2vn-auth-api-secret (secret da aplicação)</h5>
              <h5>username: email (e-mail do usuário)</h5>
              <h5>password: senha (senha do usuário)</h5>
              <h5>grant_type: password (tipo do login)</h5>
            </div>
            <h5>{'}'}</h5>
          </div>
        </Container>
      </Fragment>
    );
  }
}

const TokenPageConst = withGlobalState(withRouter(Dimensions()(TokenPage)));
const Token = () => (
  <Fragment>
    <TokenPageConst />
  </Fragment>

);

export default Token;
