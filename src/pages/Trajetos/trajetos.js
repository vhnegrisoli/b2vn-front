import React, { Component, Fragment } from "react";
import Dimensions from "react-dimensions";
import { withRouter } from "react-router-dom";
import NavBar from "../NavBar/navbar";
import { withGlobalState } from 'react-globally'
import api from "../../services/api";
import api_radares from "../../services/api_radares";
import { Container, HeaderLine } from "./style";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Swal from 'sweetalert2'


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
        }} onClick={() => console.log('export to csv')}
    >CSV</button>
);

class TrajetosPage extends Component {
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

    getAllLocalizacao = async (page) => {
        try {
            const response = await api_radares.get("api/trajetos?page=" + page + "&size=10");
            this.setState({
                data: response.data.trajetosResponse.content,
                totalElements: response.data.totalElements,
                perPageItemCount: response.data.size,
                loading: false
            });
        } catch (err) {
            console.log(err);
        }
    };

    getDistanceFromTrajeto = async (id) => {
        try {
            const response = await api_radares.get("api/trajetos/" + id + "/distancia");
            Swal.fire({
                icon: 'info',
                title: 'Distância entre os radares: ' + response.data.distancia + 'm'
            })
        } catch (err) {
            console.log(err);
        }
    };

    componentDidMount() {
        if (this.props.globalState.usuario.id === 0)
            this.getUsuarioLogado();
        this.getAllLocalizacao(0);
    }



    render() {
        return (
            <Fragment>
                <NavBar {...this.props} />
                <Container>
                    <HeaderLine>
                        <h2>
                            Trajetos
                        </h2>
                        <ExportToCSVButton />

                    </HeaderLine>

                    <ColoredLine color='black' />
                    <ReactTable
                        data={this.state.data}
                        columns={[
                            {
                                Header: "Origem",
                                accessor: "radarOrigem.endereco"
                            },
                            {
                                Header: "Destino",
                                accessor: "radarDestino.endereco"
                            },

                            {
                                Header: "Velocidade incial",
                                accessor: "trajetoCompleto.v0"
                            },
                            {
                                Header: "Velocidade final",
                                accessor: "trajetoCompleto.v1"
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
                        getTdProps={(state, rowInfo, column, instance) => {
                            return {
                                onClick: (e, handleOriginal) => {
                                    console.log('It was in this row:', rowInfo.row._original.trajetoCompleto.id)
                                    this.getDistanceFromTrajeto(rowInfo.row._original.trajetoCompleto.id)


                                    if (handleOriginal) {
                                        handleOriginal()
                                    }
                                }
                            }
                        }}
                        onPageChange={(pageIndex) => {
                            this.setState({ loading: true });
                            this.getAllLocalizacao(pageIndex)
                        }}

                    />

                </Container>
            </Fragment>
        );
    }
}

const TrajetosPageConst = withGlobalState(withRouter(Dimensions()(TrajetosPage)));
const Trajetos = () => (
    <Fragment>
        <TrajetosPageConst />
    </Fragment>

);

export default Trajetos;
