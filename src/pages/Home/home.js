import React, { Component, Fragment } from "react";
import Dimensions from "react-dimensions";
import { withRouter } from "react-router-dom";
import { getToken } from "../../services/auth";
import { Container } from "./styles";
import NavBar from "../NavBar/navbar";
import { withGlobalState } from 'react-globally'

const token = getToken();
class HomePage extends Component {

  render() {
    return (
      <Fragment>
        <NavBar {...this.props} />
        <Container>
          <h3>Você está logado! Ao chegar nessa tela você já tem seu token</h3>
          <a style={{ backgroundColor: "#000000", color: "#FFFFFF", fontSize: 32 }}>{token}</a>
          <h2>Para sua obtenção foi utilizado o método POST "/oauth/token" e passado como Header dele uma Authorization key, como por exemplo:
            "Authorization": "Bearer {token}"
          </h2>
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
