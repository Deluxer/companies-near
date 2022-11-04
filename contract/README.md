# Contratopara agregar compañias en NEAR

## Requisitos
1. Asegurese de instalar [rust](https://rust.org/).
2. Instalar [`NEAR CLI`](https://github.com/near/near-cli#setup)


Se deberá reemplazar la cuenta de prueba ubicada en `neardev/dev-account` por una cuenta real o testnet:

```bash
cat ./neardev/dev-account
# e.g. dev-1659899566943-21539992274727
```

<br />

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

    near deploy --accountId test-one.deluxer.testnet --wasmFile contract/target/wasm32-unknown-unknown/release/companies.wasm

```bash
# Use near-cli para iniciar sesion en su cuenta de NEAR
near login
```