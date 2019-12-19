import React, { Component, Fragment } from 'react';
import Dimensions from 'react-dimensions';
import { withRouter } from 'react-router-dom';
import NavBar from '../NavBar/navbar';
import { withGlobalState } from 'react-globally';
import api from '../../services/api';
import api_radares from '../../services/api_radares';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import '../../styles/iframe.css';

const DASHBOARD_LINK =
  'https://app.powerbi.com/view?r=eyJrIjoiNDZhM2ViM2UtMmM0MS00OTc4LTgzODItYmNjNDk5NTk2ZGM4IiwidCI6Ijg2ZjhmOGY5LTk3YTQtNDZkMS05ZTc3LWY2ZGRkYTgwNjkzOCJ9';

class HomePage extends Component {
  state = {
    data: {},
  };

  getCSVRadares = async () => {
    try {
      const response = await api_radares.get('api/relatorios/csv/radares');
      var blob = new Blob([response.data], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, 'radares.csv');
    } catch (err) {
      console.log(err);
    }
  };

  getUsuarioLogado = async e => {
    try {
      const respose = await api.get('api/usuarios/usuario-autenticado');
      this.props.setGlobalState(prevGlobalState => ({
        usuario: respose.data,
      }));
    } catch (err) {
      if (
        err.response.data &&
        (err.response.data.status === 429 || err.response.data.status === 500)
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message,
        });
      } else {
        this.props.history.push('/logout');
      }
    }
  };

  getRadaresPorTipo = async e => {
    try {
      const response = await api_radares.get('api/radares/tipo/totais');
      let tipo = [];
      let total = [];
      for (let i = 0; i < response.data.length; i++) {
        tipo.push(response.data[i].tipo);
        total.push(response.data[i].total);
      }
      this.setState({
        data: {
          labels: tipo,
          datasets: [
            {
              data: total,
              backgroundColor: ['#FFFFF', '#36A2EB', '#FFCE56'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
          ],
        },
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Tente novamente mais tarde!',
      });
    }
  };

  componentDidMount() {
    if (this.props.globalState.usuario.id === 0) this.getUsuarioLogado();
    this.getRadaresPorTipo();
  }

  render() {
    return (
      <Fragment>
        <NavBar {...this.props} />
        <div className="wrapper">
          <div>
            <iframe
              frameborder="0"
              height="465px"
              width="470px"
              scrolling="no"
              src={DASHBOARD_LINK}
              title="Dashboard Analítica - Radares"
              allowfullscreen
            ></iframe>
          </div>
        </div>
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
