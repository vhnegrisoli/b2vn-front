import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Logo from "../../assets/logo.png";
import { setToken, isAuthenticated } from "../../services/auth";
import api from "../../services/api";

import { Form, SplitLeft, Centered, SplitRight } from "./styles";

const app_client = 'b2vn-auth-api-client';
const app_secret = 'b2vn-auth-api-secret';

function createLoginFormData(email, senha) {
  const loginForm = new FormData();
  loginForm.append('client_id', app_client);
  loginForm.append('client_secret', app_secret);
  loginForm.append('username', email);
  loginForm.append('password', senha);
  loginForm.append('grant_type', 'password');
  return loginForm;
}

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("oauth/token", createLoginFormData(email, password), {
          Headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer YjJ2bi1hdXRoLWFwaS1jbGllbnQ='
          }
        });
        setToken(response.data.access_token);
        this.props.history.push("/home");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais"
        });
      }
    }
  };

  componentDidMount() {
    if (isAuthenticated())
      this.props.history.push("/home");
  }

  render() {
    return (
      <div align="center">
        <SplitLeft>
          <img alt="b2vn" src={Logo} width="100%" />
        </SplitLeft>

        <SplitRight>
          <Centered>
            <Form onSubmit={this.handleSignIn}>
              <img src={Logo} alt="logo" />
              {this.state.error && <p>{this.state.error}</p>}
              <input
                type="email"
                placeholder="Endereço de e-mail"
                onChange={e => this.setState({ email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Senha"
                onChange={e => this.setState({ password: e.target.value })}
              />
              <button type="submit">Entrar</button>
              <hr />
              Ainda não é cadastrado?
              <Link to="/signup">Crie sua conta</Link>
            </Form>
          </Centered>
        </SplitRight >

      </div>
    );
  }
}

export default withRouter(SignIn);
