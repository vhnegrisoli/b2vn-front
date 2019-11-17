import React, { Component, Fragment } from "react";
import Dimensions from "react-dimensions";
import { withRouter } from "react-router-dom";
import { Container } from "./styles";
import NavBar from "../NavBar/navbar";
import { withGlobalState } from 'react-globally'
import api from "../../services/api";
import api_radares from "../../services/api_radares";
import Swal from 'sweetalert2'
import { saveAs } from 'file-saver';



class ExportacaoPage extends Component {



    getCSVRadares = async () => {
        try {
            const response = await api_radares.get("api/relatorios/csv/radares");
            var blob = new Blob([response.data], { type: "text/plain;charset=utf-8" });
            saveAs(blob, "radares.csv");

        } catch (err) {
            console.log(err);
        }
    };


    getUsuarioLogado = async e => {
        try {
            const respose = await api.get("api/usuarios/usuario-autenticado");
            this.props.setGlobalState(prevGlobalState => ({
                usuario: respose.data
            }))
        } catch (err) {
            if (err.response.data && (err.response.data.status === 429 || err.response.data.status === 500)) {
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


    componentDidMount() {
        if (this.props.globalState.usuario.id === 0)
            this.getUsuarioLogado();
    }

    render() {
        return (
            <Fragment>
                <NavBar {...this.props} />
                <Container>

                    <table>
                        <tr>
                            <th>Tipo </th>
                            <th>Formatos</th>
                        </tr>
                        <tr>
                            <td>Radares</td>
                            <td><button
                                style={{
                                    color: 'white',
                                    backgroundColor: 'green',
                                    borderRadius: '4px',
                                    padding: 8
                                }} onClick={() => this.getCSVRadares()}
                            >CSV</button> <button
                                style={{
                                    color: 'white',
                                    backgroundColor: 'blue',
                                    borderRadius: '4px',
                                    padding: 8
                                }} onClick={() => this.getCSVRadares()}
                            >PDF</button></td>
                        </tr>
                        <tr>
                            <td>Trajetos</td>
                            <td><button
                                style={{
                                    color: 'white',
                                    backgroundColor: 'green',
                                    borderRadius: '4px',
                                    padding: 8
                                }} onClick={() => this.getCSVRadares()}
                            >CSV</button> <button
                                style={{
                                    color: 'white',
                                    backgroundColor: 'blue',
                                    borderRadius: '4px',
                                    padding: 8
                                }} onClick={() => this.getCSVRadares()}
                            >PDF</button></td>
                        </tr>

                    </table>
                </Container>
            </Fragment>
        );
    }
}

const ExportacaoPageConst = withGlobalState(withRouter(Dimensions()(ExportacaoPage)));
const Exportacao = () => (
    <Fragment>
        <ExportacaoPageConst />
    </Fragment>

);

export default Exportacao;
