# ServeRest API Tests com PactumJS

Projeto de testes automatizados de API utilizando **PactumJS** e **Joi** para validar os endpoints públicos do [ServeRest](https://serverest.dev/).

O objetivo é demonstrar boas práticas em testes de API:
- Separação entre testes **funcionais** e testes de **contrato**.
- Organização em suítes, seguindo o padrão **AAA (Arrange, Act, Assert)**.
- Estrutura preparada para crescimento e fácil manutenção.
- Integração com relatórios e pipeline no GitHub Actions.

---

## Tecnologias Utilizadas

- **Node.js**
- **PactumJS** – framework de testes de API
- **Mocha** – test runner
- **Chai** – assertions
- **Joi** – validação de schema (contratos de resposta)
- **Mochawesome** – geração de relatórios HTML/JSON
- **GitHub Actions** – pipeline de CI

---

## Pré-requisitos

- Node.js (recomendado: >= 18.x)
- npm (instalado junto com o Node)

---

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/SEU-USUARIO/serverest-api-pactum.git
cd serverest-api-pactum
npm install
