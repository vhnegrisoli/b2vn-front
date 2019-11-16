import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Logo from "../../assets/logo.png";
import axios from "axios";
import { setToken } from "../../services/auth";

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
        const response = await axios.post("http://192.168.1.105:8080/oauth/token", createLoginFormData(email, password), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
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

  render() {
    return (
      <div>

        <SplitLeft>
          <Centered>
            <h3>Para entrar no site utiliza o e-mail e senha!</h3>
            <h4>Caso ainda não tenha cadastro, crie sua conta já</h4>
          </Centered>
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
              <Link to="/signup">Criar conta</Link>
            </Form>
          </Centered>
        </SplitRight >

      </div>
    );
  }
}

export default withRouter(SignIn);
