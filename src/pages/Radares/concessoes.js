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
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'


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



class ConcenssoesPage extends Component {
    state = {
        data: [],
        totalElements: 0,
        loading: false,
        concessoes: [],
        concessao: ""
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

    getAllLocalizacao = async (page, concessao1) => {
        try {
            const response = await api_radares.get("api/radares/concessoes/" + concessao1 + "?page=" + page + "&size=10");
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

    getConcessoes = async (page) => {
        try {
            const response = await api_radares.get("api/radares/concessoes");
            this.setState({
                concessoes: response.data,
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
        this.getConcessoes();
    }

    _onSelectConcessoes = (selected) => {
        this.setState({
            concessao: selected.value
        });

        this.getAllLocalizacao(0, selected.value)
    }


    render() {
        return (
            <Fragment>
                <NavBar {...this.props} />
                <Container>
                    <HeaderLine>
                        <h2>
                            Concessões por radares
                        </h2>
                        <div style={{ paddingTop: 2 }}>
                            Escolha um:
                            <Dropdown arrowClosed={<span className="arrow-closed" />}
                                arrowOpen={<span className="arrow-open" />} options={this.state.concessoes} onChange={this._onSelectConcessoes} className='myClassName' value={this.state.concessao} placeholder="Concessões" />

                        </div>

                    </HeaderLine>

                    <ColoredLine color='black' />
                    <ReactTable
                        data={this.state.data}
                        columns={[
                            {
                                Header: "Código",
                                accessor: "codigo"
                            },
                            {
                                Header: "Lote",
                                accessor: "lote"
                            },
                            {
                                Header: "Quantide de Faixas",
                                accessor: "qtdeFxsF"
                            },
                            {
                                Header: "Tipo do Equipamento",
                                accessor: "tipoEquip"
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
                            this.getAllLocalizacao(pageIndex, this.state.concessao)
                        }}

                    />

                </Container>
            </Fragment>
        );
    }
}

const ConcenssoesPageConst = withGlobalState(withRouter(Dimensions()(ConcenssoesPage)));
const Concessoes = () => (
    <Fragment>
        <ConcenssoesPageConst />
    </Fragment>

);

export default Concessoes;
