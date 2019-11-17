import React, { Component, Fragment } from "react";
import Dimensions from "react-dimensions";
import { withRouter } from "react-router-dom";
import api from "../../services/api";
import { withGlobalState } from 'react-globally'
import { Container } from "./styles";
import NavBar from "../NavBar/navbar";
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import Swal from 'sweetalert2'
import ReactTable from "react-table";
import "react-table/react-table.css";

class GrantAdminPage extends Component {
  state = {
    usuarios: [],
    cpf: "",
    data: [],
    totalElements: 0,
    loading: false
  };



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

  getAllUsuarios = async e => {
    try {
      const response = await api.get("api/usuarios");
      for (let i = 0; i < response.data.length; i++) {
        this.state.usuarios.push(response.data[i].cpf)
        this.setState({
          data: response.data
        })
      }
    } catch (err) {
      console.log(err);
    }
  };


  tornarUsuarioAdministrador = async e => {
    try {
      const response = await api.post("api/usuarios/admin/novo", { cpf: this.state.cpf });
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: response.data.message,
      })
      this.getAllUsuarios();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response.data.message
      })
    }
  };

  componentDidMount() {
    if (this.props.globalState.usuario.id === 0)
      this.getUsuarioLogado();
    this.getAllUsuarios();
  }


  render() {
    return (
      <Fragment>
        <NavBar {...this.props} />


        <Container>
          <ReactTable
            data={this.state.data}
            columns={[
              {
                Header: "Código",
                accessor: "id"
              },
              {
                Header: "Nome",
                accessor: "nome"
              },
              {
                Header: "CPF",
                accessor: "cpf"
              },
              {
                Header: "E-mail",
                accessor: "email"
              },
              {
                Header: "Permissão",
                accessor: "descricao"
              }
            ]}
            defaultPageSize={10}
            pages={parseInt(this.state.totalElements / 10, 10) + 1}
            className="-striped -highlight"
            loading={this.state.loading}
            showPagination={true}
            showPaginationTop={false}
            showPaginationBottom={true}
            showPageSizeOptions={false}
            previousText='Voltar'
            nextText='Próximo'
            loadingText='Carregando...'
            noDataText='Nenhum dado encontrado'
            pageText='Página'
            ofText='de'
            rowsText='linhas'
            manual
            onPageChange={(pageIndex) => {
              this.setState({ loading: true });
              this.getAllLocalizacao(pageIndex)
              console.log(pageIndex)
            }}

          />
          <h4 style={{ paddingTop: 12 }}>Digite o CPF de um usuário para torná-lo administrador</h4>
          <TextInput
            onChange={(cpf) => this.setState({ cpf })}
            value={this.state.cpf} spacer='' Component="input" style={{ width: 300, padding: 8 }} options={this.state.usuarios} trigger="" />
          <button onClick={() => this.tornarUsuarioAdministrador(this.state.cpf)}>Tornar admin</button>
        </Container>
      </Fragment>
    );
  }
}

const GrantAdminPageConst = withGlobalState(withRouter(Dimensions()(GrantAdminPage)));
const GrantAdmin = () => (
  <Fragment>
    <GrantAdminPageConst />
  </Fragment>

);

export default GrantAdmin;
