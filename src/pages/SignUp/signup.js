import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Logo from "../../assets/logo.png";

import api from "../../services/api";

import { Form, SplitLeft, Centered, SplitRight } from "./styles";

class SignUp extends Component {
  state = {
    nome: "",
    email: "",
    senha: "",
    error: "",
    cpf: ""
  };

  handleSignUp = async e => {
    e.preventDefault();
    const { nome, email, senha, cpf } = this.state;
    if (!nome || !email || !senha || !cpf) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" });
    } else {
      try {
        await api.post("api/usuarios/novo", { nome, email, senha, cpf });
        this.props.history.push("/");
      } catch (err) {
        console.log(err);
        this.setState({ error: "Ocorreu um erro ao registrar sua conta" });
      }
    }
  };

  render() {
    return (

      <div>

        <SplitLeft>
          <Centered>
            <h3>Para se cadastrar no site siga os seguintes passos:</h3>
            <h4>1. Primeiro digite seu nome</h4>
            <h4>2. Segundo cadastre seu CPF</h4>
            <h4>3. Terçeiro seu endereço de e-mail</h4>
            <h4>4. Por fim, sua senha!</h4>
            <h4>E pronto, agora você já tem um cadastro como usuário COMUM</h4>
          </Centered>
        </SplitLeft>

        <SplitRight>
          <Centered>
            <Form onSubmit={this.handleSignUp}>
              <img src={Logo} alt="logo" />
              {this.state.error && <p>{this.state.error}</p>}
              <input
                type="text"
                placeholder="Nome de usuário"
                onChange={e => this.setState({ nome: e.target.value })}
              />
              <input
                type="text"
                placeholder="CPF"
                onChange={e => this.setState({ cpf: e.target.value })}
              />
              <input
                type="email"
                placeholder="Endereço de e-mail"
                onChange={e => this.setState({ email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Senha"
                onChange={e => this.setState({ senha: e.target.value })}
              />
              <button type="submit">Cadastrar</button>
              <hr />
              <Link to="/">Fazer login</Link>
            </Form>
          </Centered>
        </SplitRight >

      </div>


    );
  }
}

export default withRouter(SignUp);
