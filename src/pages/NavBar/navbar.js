import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withGlobalState } from 'react-globally'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'


class NavBar extends Component {
    state = {
        navCollapsed: true
    }

    _onToggleNav = () => {
        this.setState({ navCollapsed: !this.state.navCollapsed })
    }

    _onSelectRadares = (selected) => {
        this.props.history.push('/radares/' + selected.value)
    }

    _onSelectTrajetos = (selected) => {
        this.props.history.push('/trajetos/' + selected.value)
    }

    render() {
        const { navCollapsed } = this.state
        const optionsRadares = [
            { value: 'localizacao', label: 'Localização' },
            { value: 'enquadramento', label: 'Enquadramento' },
            { value: 'concessoes', label: 'Concessão' },
            { value: 'tipoVeiculo', label: 'Tipo de Veículo' },
            { value: 'infracoesRadar', label: 'Infrações' },
            { value: 'acuracia', label: 'Acurácia' }
        ]
        const optionTrajetos = [
            { value: 'velocidadeMedia', label: 'Velocidade Média por Trajeto' },
            { value: 'trajetos', label: 'Trajetos' }

        ]



        return (
            <nav className='navbar navbar-default'>
                <div className='navbar-header' style={{ height: 55 }}>
                    <button
                        aria-expanded='false'
                        className='navbar-toggle collapsed'
                        onClick={this._onToggleNav}
                        type='button'
                    >
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                </div>
                <div
                    className={(navCollapsed ? 'collapse' : '') + ' navbar-collapse'}
                >
                    <ul className='nav navbar-nav navbar-left'>
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/mapa">Mapa</Link>
                        </li>
                        <li>
                            <Link to="/token">Token de acesso</Link>
                        </li>


                        <li>
                            <div style={{ paddingTop: 6, width: 150 }}></div>
                            <Dropdown arrowClosed={<span className="arrow-closed" />}
                                arrowOpen={<span className="arrow-open" />} options={optionsRadares} onChange={this._onSelectRadares} className='myClassName' placeholder="Radares" />
                        </li>

                        <li>
                            <div style={{ padding: 7 }}> </div>
                        </li>

                        <li>
                            <div style={{ paddingTop: 6, width: 250 }}></div>
                            <Dropdown arrowClosed={<span className="arrow-closed" />}
                                arrowOpen={<span className="arrow-open" />} options={optionTrajetos} onChange={this._onSelectTrajetos} className='myClassName' placeholder="Trajetos" />
                        </li>

                    </ul>
                    <ul className='nav navbar-nav navbar-right'>
                        {this.props.globalState.usuario.permissao === 'ADMIN' ? <li>
                            <Link to="/grant-admin">Manutenção de usuários</Link>
                        </li> : <div></div>}
                        {this.props.globalState.usuario.permissao === 'ADMIN' ? <li>
                            <a>{this.props.globalState.usuario.descricao}</a>
                        </li> : <div></div>}

                        <li>
                            <a>{this.props.globalState.usuario.nome}</a>
                        </li>
                        <li>
                            <Link to="/logout">Logout</Link>
                        </li>

                    </ul>
                </div>
            </nav >
        )
    }
}



export default withGlobalState(NavBar)