import React, { Component, Fragment } from "react";
import Dimensions from "react-dimensions";
import { withRouter } from "react-router-dom";
import MapGL from "react-map-gl";
import { Marker } from "react-map-gl";
import PropTypes from "prop-types";


import api from "../../services/api";
import { logout } from "../../services/auth";



import { Container, Pin } from "./styles";
import NavBar from "../NavBar/navbar";

const TOKEN =
  "pk.eyJ1IjoiaGlnb3JvY2tldCIsImEiOiJjamlrdWJuY3gyaHYxM3Bvbmg0cGRwY3R0In0._TdjX9rYrjZ6Q6FFXOGwsQ";

class Map extends Component {
  static propTypes = {
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired
  };



  state = {
    viewport: {
      latitude: -23.5489,
      longitude: -46.6388,
      zoom: 11,
      bearing: 0,
      pitch: 0
    },
    markers: [],
    addActivate: false
  };

  componentDidMount() {
    this.loadProperties();
  }

  loadProperties = async () => {
    try {
      const response = await api.get("http://192.168.1.207:8081/api/radares/localizoes/mapa", {
        headers: {
          Authorization: "Bearer 267190c0-c1fd-4e0b-9d89-242c730a552c"
        }
      });

      this.setState({ markers: response.data });
    } catch (err) {
      console.log(err);
    }
  };

  handleLogout = e => {
    logout();
    this.props.history.push("/");
  };



  render() {
    const {
      containerWidth: width,
      containerHeight: height
    } = this.props;

    const { markers } = this.state;
    return (
      <Fragment>
        <NavBar />
        <MapGL
          width={width}
          height={height * 0.7}
          {...this.state.viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken={TOKEN}
          minZoom={10}
          onViewportChange={viewport => this.setState({ viewport })}
        >

          {markers.map((marcador, index) => (
            marcador.latitude !== 0.0 ? <Marker key={index} latitude={marcador.latitude} longitude={marcador.longitude} offsetLeft={-20} offsetTop={-10} >
              <Pin />
            </Marker> : <div></div>
          ))}

        </MapGL>

      </Fragment>
    );
  }
}

const DimensionedMap = withRouter(Dimensions()(Map));
const App = () => (
  <Container>
    <DimensionedMap />
  </Container>
);

export default App;
