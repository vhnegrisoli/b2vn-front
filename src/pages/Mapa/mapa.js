import React, { Component, Fragment } from "react";
import Dimensions from "react-dimensions";
import { withRouter } from "react-router-dom";
import MapGL from "react-map-gl";
import { Marker } from "react-map-gl";
import PropTypes from "prop-types";
import Swal from 'sweetalert2'
import CheckBox from './components/checkbox'
import api from "../../services/api";
import { withGlobalState } from 'react-globally'



import { Container, PinRed, PinYellow, PinBlue, PinGreen } from "./styles";
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
    todosLotes: [
      { id: 1, value: "1", isChecked: false },
      { id: 2, value: "2", isChecked: false },
      { id: 3, value: "3", isChecked: false },
      { id: 4, value: "4", isChecked: false }
    ],
    addActivate: false
  };

  componentDidMount() {
    this.loadProperties();
  }

  getLotes = async () => {
    try {
      const response = await api.get("http://192.168.1.207:8081/api/radares/concessao", {
        headers: {
          Authorization: "Bearer 54ec92d1-2b03-4c87-af21-11821410c423"
        }
      });

      this.setState({ lotes: response.data });
    } catch (err) {
      console.log(err);
    }
  };

  getRadaresByLote = async () => {
    let array = []
    this.state.todosLotes.forEach(lote => {
      if (lote.isChecked === true) {
        array.push(lote.value)
      }

    })
    try {
      const response = await api.get("http://192.168.1.207:8081/api/radares/localizacoes/mapa/concessoes?lotes=" + array, {
        headers: {
          Authorization: "Bearer 54ec92d1-2b03-4c87-af21-11821410c423"
        }
      });

      this.setState({ markers: response.data });
    } catch (err) {
      console.log(err);
    }
  };

  loadProperties = async () => {
    try {
      const response = await api.get("http://192.168.1.207:8081/api/radares/localizacoes/mapa", {
        headers: {
          Authorization: "Bearer 54ec92d1-2b03-4c87-af21-11821410c423"
        }
      });

      this.setState({ markers: response.data });
    } catch (err) {
      console.log(err);
    }
  };




  showMessage(radar) {
    Swal.fire({
      title: '<strong>Radares</strong>',
      icon: 'info',
      html:
        'Velocidade: <b>' + radar.velocidade + '</b> - \n Lote: <b>' + radar.lote + '</b>, ',


    })
  }

  handleCheckChieldElement = (event) => {
    let todosLotes = this.state.todosLotes
    todosLotes.forEach(lote => {
      if (lote.value === event.target.value) {
        lote.isChecked = event.target.checked
      }
    })

    this.setState({ todosLotes: todosLotes })

    let array = []
    this.state.todosLotes.forEach(lote => {
      if (lote.isChecked === true) {
        array.push(lote.value)
      }

    })
    if (array.length === 0) {
      this.loadProperties();
    } else {
      this.getRadaresByLote();

    }
  }






  render() {
    const {
      containerWidth: width,
      containerHeight: height
    } = this.props;

    const { markers } = this.state;
    return (
      <Fragment>

        <NavBar {...this.props} />
        <div>
          {
            this.state.todosLotes.map((lote) => {
              return (<CheckBox handleCheckChieldElement={this.handleCheckChieldElement}  {...lote} />)
            })
          }
        </div>

        <MapGL
          width={width}
          height={height * 0.75}
          {...this.state.viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken={TOKEN}
          minZoom={10}
          onViewportChange={viewport => this.setState({ viewport })}
        >
          {markers.map((marcador, index) => (
            marcador.latitude !== 0.0 ? <Marker key={index} latitude={marcador.latitude} longitude={marcador.longitude} offsetLeft={-20} offsetTop={-10} >
              {marcador.lote === 1 ? <PinRed onClick={() => this.showMessage(marcador)} /> : marcador.lote === 2 ? <PinYellow onClick={() => this.showMessage(marcador)}
              /> : marcador.lote === 3 ? <PinGreen onClick={() => this.showMessage(marcador)} /> : <PinBlue onClick={() => this.showMessage(marcador)}
              />}
            </Marker> : <div></div>
          ))}

        </MapGL>


      </Fragment>

    );
  }
}

const DimensionedMap = withGlobalState(withRouter(Dimensions()(Map)));
const Mapa = () => (
  <Container>
    <DimensionedMap />
  </Container>
);

export default Mapa;
