import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-globally'


const initialState = {
    usuario: {
        "admin": true,
        "cpf": "string",
        "descricao": "string",
        "email": "string",
        "id": 0,
        "nome": "Carregando..",
        "permissao": "GUEST",
        "ultimoAcesso": "2019-11-16T13:07:35.690Z",
        "user": true
    }
}


ReactDOM.render(
    <Provider globalState={initialState}>
        <App /> </Provider>, document.getElementById('root'));