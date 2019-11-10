# PROJECT B2VN

## Exigências

Para o desenvolvimento, você precisará apenas do Node.js instalado em seu ambiente de trabalho.

### Node

O [Node](http://nodejs.org/) é realmente fácil de instalar.
Você poderá executar o seguinte comando após o procedimento de instalação abaixo.

    $ node --version
    v0.10.24

    $ npm --version
    1.3.21


#### Instalação do Node no Linux

    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

#### Instalação do Node no Windows

Vá para [official Node.js website](http://nodejs.org/) e baixe o instalador.
Além disso, você precisará ter o `git` e o `npm` disponíveis no seu PATH, `npm`.

---

## Instalação

    $ git clone https://github.com/Noninus/b2vn-front.git
    $ cd PROJECT
    $ npm install


## Iniciar & assistir

    $ npm start

## Build simples para a produção

    $ npm run build


## Linguagens & ferramentas

### JavaScript

- [React Map GL](https://uber.github.io/react-map-gl/) é utilizado para visualização do mapa.
- [React](http://facebook.github.io/react) é usado para a interface do usuário.
- [axios](https://github.com/axios/axios) é utilizado para o client HTTP.