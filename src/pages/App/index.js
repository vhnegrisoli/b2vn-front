import React, { Component, Fragment } from "react";
import Dimensions from "react-dimensions";
import { withRouter } from "react-router-dom";
import MapGL from "react-map-gl";
import { Marker } from "react-map-gl";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import Pin from "../../assets/pin.svg";

import api from "../../services/api";
import { logout } from "../../services/auth";



import { Container } from "./styles";
import NavBar from "../NavBar/navbar";

const TOKEN =
  "pk.eyJ1IjoiaGlnb3JvY2tldCIsImEiOiJjamlrdWJuY3gyaHYxM3Bvbmg0cGRwY3R0In0._TdjX9rYrjZ6Q6FFXOGwsQ";

class Map extends Component {
  static propTypes = {
    containerWidth: PropTypes.number.isRequired,
    containerHeight: PropTypes.number.isRequired
  };

  constructor() {
    super();
    this.updatePropertiesLocalization = debounce(
      this.updatePropertiesLocalization,
      500
    );
  }

  state = {
    viewport: {
      latitude: -23.5489,
      longitude: -46.6388,
      zoom: 12.8,
      bearing: 0,
      pitch: 0
    },
    markers: [],
    addActivate: false
  };

  componentDidMount() {
    this.loadProperties();
  }

  updatePropertiesLocalization() {
    this.loadProperties();
  }

  loadProperties = async () => {
    try {
      const response = await api.get("http://192.168.1.207:8081/api/radares/todos", {
        headers: {
          Authorization: "Bearer 267190c0-c1fd-4e0b-9d89-242c730a552c"
        }
      });
      console.log(response.data.length)
      var items = response.data.slice(0, 11);
      this.setState({ markers: items });
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
        Radares instalados em são paulo
        {markers.map((aplicativo, index) => (

          console.log(aplicativo.latitude)
        ))}
        <MapGL
          width={width}
          height={height * 0.7}
          {...this.state.viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken={TOKEN}
          onViewportChange={viewport => this.setState({ viewport })}
          onViewStateChange={this.updatePropertiesLocalization.bind(this)}
        >

          {markers.map((aplicativo, index) => (

            <Marker key={index} latitude={parseFloat(aplicativo.latitude)} longitude={parseFloat(aplicativo.longitude)} offsetLeft={-20} offsetTop={-10} >
              <img src={Pin} alt="logo" height={50} />
            </Marker>
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
