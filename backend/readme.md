### Tecnologias/frameworks utilizadas
- Node.js
- Express.js
- MSSQL
- Sequelize
- Docker
- ESLint
- Prettier

### Como rodar o backend
Abra um terminal e acesse a pasta do backend.
Digite "yarn" ou "npm" para instalar as dependências.
Enquanto as dependências são instaladas, crie um arquivo ".env" na raíz do projeto e preencha usando o exemplo presente no arquivo ".env.example.". Não se esqueça de não rodar o app numa porta que já está em uso.
Digite "yarn sequelize db:migrate" ou "npm run sequelize db:migrate" para rodar as migrations que criam as tabelas no banco de dados.
Digite "yarn start" ou "npm run start" e aguarde o seu navegador padrão abrir uma aba com o app.

A aplicação foi desenvolvida num ambiente Linux (Ubuntu 18.04LTS), podem havem incompatibilidades dependendo da plataforma.
O banco de dados necessário é do tipo Microsoft SQL. Para desenvolvimento foi utilizado um conteiner do tipo Docker.
O guia para a criação do conteiner encontra-se no link a seguir: https://docs.microsoft.com/pt-br/sql/linux/quickstart-install-connect-docker?view=sql-server-ver15&pivots=cs1-bash

Obs.: Certifique-se de estar rodando o frontend para poder consumir essa api facilmente.
