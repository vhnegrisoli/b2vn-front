import React, { Component, Fragment } from "react";
import Dimensions from "react-dimensions";
import { withRouter } from "react-router-dom";
import NavBar from "../NavBar/navbar";
import { withGlobalState } from 'react-globally'
import api from "../../services/api";
import api_radares from "../../services/api_radares";
import { Container } from "./style";
import ReactTable from "react-table";
import "react-table/react-table.css";

const ColoredLine = ({ color }) => (
    <div
        style={{
            marginBottom: 8,
            color: color,
            backgroundColor: color,
            opacity: 0.2,
            height: 2
        }}
    />
);

const ExportToCSVButton = () => (
    <button
        style={{
            color: 'white',
            backgroundColor: 'green',
            borderRadius: '12px',
            padding: 12
        }}
    >CSV</button>
);

class LocalizacoesPage extends Component {
    state = {
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
            console.log(err);
            this.props.history.push("/logout");
        }
    };

    getAllLocalizacao = async (page) => {
        try {
            const response = await api_radares.get("api/radares/buscar-todos?page=" + page + "&size=10");
            this.setState({
                data: response.data.content,
                totalElements: response.data.totalElements,
                perPageItemCount: response.data.size,
                loading: false
            });
        } catch (err) {
            console.log(err);
        }
    };

    componentDidMount() {
        if (this.props.globalState.usuario.id === 0)
            this.getUsuarioLogado();
        this.getAllLocalizacao(1);
    }



    render() {
        return (
            <Fragment>
                <NavBar {...this.props} />
                <Container>
                    <h2>
                        Localização dos radares
                    </h2>
                    <ExportToCSVButton />
                    <ColoredLine color='black' />
                    <ReactTable
                        data={this.state.data}
                        columns={[
                            {
                                Header: "Código",
                                accessor: "codigo"
                            },
                            {
                                Header: "Endereço",
                                accessor: "endereco"
                            },
                            {
                                Header: "Referência",
                                accessor: "referencia"
                            },
                            {
                                Header: "Lat/Long",
                                accessor: "latitudeL"
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

                </Container>
            </Fragment>
        );
    }
}

const LocalizacoesPageConst = withGlobalState(withRouter(Dimensions()(LocalizacoesPage)));
const Localizacoes = () => (
    <Fragment>
        <LocalizacoesPageConst />
    </Fragment>

);

export default Localizacoes;
