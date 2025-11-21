# Testes de API - ServeRest com PactumJS

Este projeto contém testes automatizados para a API **ServeRest** utilizando PactumJS, Mocha, Chai e Joi.  
Foram desenvolvidos *testes funcionais* e *testes de contrato*, cobrindo todos os principais endpoints: **login, usuários e produtos**.

A API utilizada está disponível em:  
👉 https://serverest.dev/

---

## 🚀 Tecnologias Utilizadas

| Tecnologia     | Uso no Projeto |
|----------------|----------------|
| **Node.js**    | Ambiente para execução dos testes |
| **PactumJS**   | Requisições HTTP e validações funcionais |
| **Mocha**      | Test runner |
| **Chai**       | Assertions |
| **Joi**        | Validação do contrato das respostas |
| **Mochawesome**| Relatórios HTML/JSON dos testes |
| **GitHub Actions** | CI/CD rodando testes a cada push |

---

---

## 📁 Estrutura do Projeto
```
qa.automationexercise-api.pactumjs/
├── .github/
│   └── workflows/
│       └── main.yml                 # Pipeline CI com GitHub Actions
│
├── src/
│   ├── clients/                     # Camada Client (encapsula chamadas da API)
│   │   ├── loginClient.js
│   │   ├── productClient.js
│   │   └── userClient.js
│   │
│   ├── config/                      # Configurações de URL e endpoints
│   │   └── config.js
│   │
│   ├── data/                        # Massa/dados dinâmicos para testes
│   │   ├── productData.js
│   │   └── userData.js
│   │
│   ├── helpers/                     # Utils e configuração do Pactum
│   │   └── utils.js
│   │
│   ├── schemas/                     # Schemas Joi (validação de contrato)
│   │   ├── loginSchema.js
│   │   ├── productSchema.js
│   │   └── userSchema.js
│   │
│   └── tests/
│       ├── contract-schema/         # Testes de contrato (Joi)
│       │   ├── loginContract.test.js
│       │   ├── productsContract.test.js
│       │   └── usersContract.test.js
│       │
│       └── e2e/                     # Testes funcionais (CRUD completo)
│           ├── login.test.js
│           ├── products.test.js
│           └── users.test.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

```

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/mariomoretto/qa.automationexercise-api.pactumjs.git
cd qa.automationexercise-api.pactumjs
```

2. Instale as dependências::

```bash
npm install
```

## ▶️ Como Executar os Testes
**🔹 Rodar todos os testes (funcionais + contrato)**
```bash
npm test
```

**🔹 Apenas testes funcionais**
```bash
npm run test:functional
```

**🔹 Apenas testes de contrato**
```bash
npm run test:contract
```

## 📊 Relatório de Testes (Mochawesome)

Este projeto está integrado com Mochawesome, que gera relatórios completos em HTML e JSON, contendo:

  - Pass/Fail por teste
  - Logs
  - Screenshot da resposta da API
  - Detalhes completos de cada request/response

**🔹 Gerar o relatório**
```bash
npm run report
```

**🔹 Onde o relatório fica?**

Ele é criado automaticamente em:
```bash
/reports/report.html
/reports/report.json
```

**🔹 Como visualizar?**

Basta abrir o arquivo:
```bash
reports/report.html
```

**👉 Clique duas vezes no arquivo**

OU

**👉 Via terminal:**
```bash
start reports/report.html   # Windows
open reports/report.html    # Mac
```

## 🧪 Padrões de Testes e Arquitetura

O projeto segue boas práticas como:

**✔️ Separação de responsabilidades**

  - config/ → baseUrl + endpoints
  - data/ → geração de massa dinâmica (ex.: email aleatório)
  - schemas/ → contratos Joi
  - helpers/ → configuração do Pactum
  - tests/functional/ → testes CRUD
  - tests/contract/ → validação de contrato

**✔️ Triple A (Arrange → Act → Assert)**

Exemplo:
```bash
// Arrange
const payload = {...};

// Act
const res = await pactum.spec().post('/login').withJson(payload).toss();

// Assert
expect(res.json.message).to.equal('Login realizado com sucesso');
```

## 📡 Camada de Clients da API (Design Architecture)

Este projeto implementa uma arquitetura adicional chamada API Client Layer, criada com o objetivo de:

  - organizar melhor as chamadas HTTP
  - evitar duplicação de código
  - deixar os testes mais limpos, fáceis de manter e de escalar
  - isolar a lógica de requisição em arquivos próprios
  - permitir que o projeto cresça de forma sustentável

## 🧩 O que são os clients?

A camada clients funciona como uma coleção de “mini-SDKs” internos, onde cada arquivo encapsula a interação com um recurso da API:
```bash
src/clients/
 ├── loginClient.js
 ├── userClient.js
 └── productClient.js
```

**✔️ Testes organizados em suítes**

Cada recurso tem sua própria suíte:

  - Login
  - Usuários
  - Produtos

## 🧩 Casos de Teste Implementados

**🔹 Login**
  - POST /login
  - Validação de contrato + funcional

**🔹 Usuários**
  - GET /usuarios
  - POST /usuarios
  - GET /usuarios/{id}
  - PUT /usuarios/{id}
  - DELETE /usuarios/{id}
  - Validação de contrato completa

**🔹 Produtos**
  - GET /produtos
  - POST /produtos
  - GET /produtos/{id}
  - PUT /produtos/{id}
  - DELETE /produtos/{id}
  - Suporte a token (Authorization)

## 🔄 CI/CD

O GitHub Actions é executado automaticamente a cada push na branch principal.

Pipeline inclui:
```bash
  1- Checkout do repositório
  2- Setup do Node
  3- Instalação das dependências
  4- Execução dos testes funcionais
  5- Execução dos testes de contrato
  6- Geração dos relatórios
```

Arquivo da pipeline:
/.github/workflows/main.yml
