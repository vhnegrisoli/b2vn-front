import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ModalContainer } from "react-router-modal";
import "react-router-modal/css/react-router-modal.css";

import { isAuthenticated } from "./services/auth";

import SignUp from "./pages/SignUp/signup";
import SignIn from "./pages/SignIn/signin";
import Home from "./pages/Home/home";
import Mapa from "./pages/Mapa/mapa";
import Logout from "./pages/Logout/logout";
import GrantAdmin from "./pages/GrantAdmin/grant_admin";
import Localizacoes from "./pages/Radares/localizacao";
import TipoVeiculo from "./pages/Radares/tipoVeiculo";
import InfracoesRadar from "./pages/Radares/infracoesRadar";
import AcuraciaRadar from "./pages/Radares/acuraciaRadar";
import Token from "./pages/Token/token";
import VelocidadeMediaTrajeto from "./pages/Trajetos/velocidadeMediaTrajetos";
import Enquadramento from "./pages/Radares/enquadramento";
import Concessoes from "./pages/Radares/concessoes";
import Trajetos from "./pages/Trajetos/trajetos";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Fragment>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/logout" component={Logout} />
        <Route path="/grant-admin" component={GrantAdmin} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/mapa" component={Mapa} />
        <PrivateRoute path="/token" component={Token} />
        <PrivateRoute path="/radares/localizacao" component={Localizacoes} />
        <PrivateRoute path="/radares/tipoVeiculo" component={TipoVeiculo} />
        <PrivateRoute path="/radares/infracoesRadar" component={InfracoesRadar} />
        <PrivateRoute path="/radares/acuracia" component={AcuraciaRadar} />
        <PrivateRoute path="/radares/enquadramento" component={Enquadramento} />
        <PrivateRoute path="/radares/concessoes" component={Concessoes} />

        <PrivateRoute path="/trajetos/velocidadeMedia" component={VelocidadeMediaTrajeto} />
        <PrivateRoute path="/trajetos/trajetos" component={Trajetos} />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
      <ModalContainer />
    </Fragment>
  </BrowserRouter>
);

export default Routes;
