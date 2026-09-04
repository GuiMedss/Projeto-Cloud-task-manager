# Projeto 1 - Task Manager

Base inicial 

- VM `proxy`: NGINX como proxy reverso.
- VM `app`: Node.js + Express para a aplicacao.
- VM `db`: MySQL Server para o banco de dados.

## Arquitetura

```text
Browser
  |
  | HTTP :80
  v
proxy - 192.168.56.10 / 192.168.57.10
  |
  | HTTP :3000
  v
app - 192.168.57.11
  |
  | MySQL :3306
  v
db - 192.168.57.12
```

## Como subir o ambiente

```bash
vagrant up
```

Esta versao ainda nao implementa as funcionalidades reais do task manager. Ela apenas instala os pacotes base e deixa os arquivos iniciais organizados para desenvolvimento.

## Estrutura

```text
.
├── Vagrantfile
├── app/
│   ├── .env.example
│   └── package.json
├── db/
│   └── init.sql
├── infra/
│   └── nginx/
│       └── task-manager.conf
└── scripts/
    └── provision/
        ├── app.sh
        ├── db.sh
        └── proxy.sh
```
