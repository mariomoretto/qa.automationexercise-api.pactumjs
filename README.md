# Testes de API - ServeRest com PactumJS

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

![Mocha](https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=mocha&logoColor=white)

![Chai](https://img.shields.io/badge/Chai-A30701?style=for-the-badge&logo=chai&logoColor=white)

![Joi](https://img.shields.io/badge/Joi-17.x-blue?style=for-the-badge)

![PactumJS](https://img.shields.io/badge/PactumJS-000000?style=for-the-badge&logo=postman&logoColor=white)

![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)


Este projeto contém testes automatizados para a API **ServeRest** utilizando PactumJS, Mocha, Chai e Joi.  
Foram desenvolvidos *testes funcionais* e *testes de contrato*, cobrindo todos os principais endpoints: **login, usuários e produtos**.

A API utilizada está disponível em:  
👉 https://serverest.dev/

---

## 📁 Estrutura do Projeto
```
qa.automationexercise-api.pactumjs/
├── .github/workflows/ # Pipeline CI com GitHub Actions
├── src/
│ ├── config/ # Configurações de URL e endpoints
│ ├── data/ # Massa/dados dinâmicos para testes
│ ├── helpers/ # Utils e configuração do Pactum
│ ├── schemas/ # Schemas Joi (validação de contrato)
│ └── tests/
│ ├── contract/ # Testes de contrato (Joi)
│ └── functional/ # Testes funcionais (CRUD completo)
├── reports/ # Relatórios mochawesome (gerado automaticamente)
├── package.json
├── .gitignore
└── README.md
```

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
