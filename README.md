Registro de Compañias y empleados
==================

Registro de compañias y empleados, el objetivo de este repositorior es interactuar de manera sencilla con el protocolo NEAR y aprender a usar el lenguaje de programación Rust.

*By Gerardo Del Angel Eq3*


### Escritura:
* `set_company`
### Lecture:
* `get_company`
* `get_companies`

</br>

## Requisitos
1. Asegurese de instalar [rust](https://rust.org/).
2. Instalar [`NEAR CLI`](https://github.com/near/near-cli#setup)
</br>
</br>


Quick Start
===========

instalacion de dependencias

    npm install


Deploy de frontend y contrato inteligente, esta 

    npm run deploy

Test contract

    npm test

Iniciar DAPP e interactual con el contrato inteligente (***TODO***)

    npm start


Crear compañia
---------------------------
```sh
near call test-five.deluxer.testnet set_company '{"id":1, "name":"ACME","description":"ACME SA DE CV"}' --accountId test-five.deluxer.testnet
```

Obtener compañia
---------------------------
```sh
near view test-five.deluxer.testnet get_company '{"id":1}'
```

Obtener todas las compañias
---------------------------
```sh
near view test-five.deluxer.testnet get_company
```

Desplegar contrato manual
---------------------------

    near deploy --accountId test-five.deluxer.testnet --wasmFile contract/target/wasm32-unknown-unknown/release/companies.wasm


Dependencias

  * [create-near-app](https://github.com/near/create-near-app)
  * [Node.js](https://nodejs.org/en/download/package-manager/)
  * [jest](https://jestjs.io/)
  * [NEAR accounts](https://docs.near.org/concepts/basics/account)
  * [NEAR Wallet](https://wallet.testnet.near.org/)
  * [near-cli](https://github.com/near/near-cli)
  * [gh-pages](https://github.com/tschaub/gh-pages)


## Solucion de problemas

Problemas son **openssl** en Ubuntu
```
sudo apt-get install libssl-dev
```