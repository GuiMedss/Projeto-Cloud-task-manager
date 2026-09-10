# Projeto 1 - Task Manager

Projeto simples de gerenciamento de tarefas para a disciplina de Computacao em Nuvem.

A aplicacao usa tres maquinas virtuais com Vagrant:

- `proxy`: entrada do sistema, usando NGINX como proxy reverso.
- `app`: servidor da aplicacao, usando Node.js e Express.
- `db`: banco de dados, usando MySQL.

## Como executar

Na pasta do projeto, rode:

```bash
vagrant up
```

Depois acesse no navegador:

```text
http://192.168.56.10
```

## Enderecos

| Maquina | IP | Funcao |
| --- | --- | --- |
| proxy | 192.168.56.10 | acesso pelo navegador |
| proxy | 192.168.57.10 | comunicacao com a rede interna |
| app | 192.168.57.11 | servidor Node.js |
| db | 192.168.57.12 | servidor MySQL |

## Fluxo

```text
Navegador
  -> proxy / NGINX
  -> app / Node.js
  -> db / MySQL
```

O usuario acessa apenas a VM `proxy`. O NGINX repassa as requisicoes para a VM `app`, e a aplicacao acessa o banco pela rede interna.

## Rotas principais

```text
GET    /health
GET    /db-health
GET    /tasks
POST   /tasks
PUT    /tasks/:id
DELETE /tasks/:id
```

## Testes rapidos

Verificar se as VMs estao rodando:

```bash
vagrant status
```

Testar a API pelo proxy:

```bash
curl http://192.168.56.10/health
curl http://192.168.56.10/tasks
```

## Estrutura

```text
.
|-- Vagrantfile
|-- app/
|   |-- public/
|   |-- src/
|   |-- .env.example
|   |-- package.json
|   `-- package-lock.json
|-- db/
|   `-- init.sql
|-- infra/
|   `-- nginx/
|       `-- task-manager.conf
`-- scripts/
    `-- provision/
        |-- app.sh
        |-- db.sh
        `-- proxy.sh
```

## Divisao geral

- Configuracao do ambiente, Vagrant, NGINX e ajustes finais.
- Rotas do backend e estrutura do banco.
- Interface simples para usar o gerenciador de tarefas.
