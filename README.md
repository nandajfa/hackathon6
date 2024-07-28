# App de Aprendizado Gamificado

 <div align="center">

[![NPM](https://img.shields.io/npm/l/react)](https://github.com/nandajfa/hackathon6/blob/main/LICENSE)

 </div>

## Visão Geral

O objetivo deste hackathon é desenvolver uma plataforma educacional inovadora que utilize elementos de gamificação para tornar o aprendizado mais envolvente e eficaz. A ideia é integrar mecânicas de jogos, como pontos, medalhas, níveis e desafios, para motivar os usuários a progredirem em seus estudos de maneira divertida e interativa.

## Índice

- [App de Aprendizado Gamificado](#app-de-aprendizado-gamificado)
  - [Visão Geral](#visão-geral)
  - [Índice](#índice)
  - [Instalação](#instalação)
  - [Configuração](#configuração)
  - [Uso](#uso)
  - [Funcionalidades](#funcionalidades)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Contribuição](#contribuição)
  - [Autor](#autor)

## Instalação

1. Clone o repositório:

   ```sh
   git clone https://github.com/nandajfa/hackathon6.git
   cd hackathon6
   ```

2. Instale as dependências:

   ```sh
   # frontend:
   cd client
   npm install

   # backend
   cd api
   npm install
   ```

## Configuração

Crie um arquivo `.env` na raiz da pasta api para definir as variáveis de ambiente necessárias. Aqui está um exemplo:

```env
SUPABASE_URL=
SUPABASE_KEY=
JWT_SECRET=
COOKIE_SECRET=
PORT=
```

## Uso

Para iniciar o servidor, execute o seguinte comando:

```sh
# frontend
cd client
npm start

# backend
cd api
npm start
```

O servidor será iniciado em http://localhost:3003. <br>
O app será iniciado em http://localhost:3000.

## Funcionalidades

- Quizzes Interativos: Crie e responda quizzes para testar seus conhecimentos.
- Sistema de Pontuação: Ganhe pontos ao completar quizzes e tarefas.
- Níveis e Medalhas: Progrida através de níveis e ganhe medalhas por suas conquistas.
- Desafios: Participe de desafios para ganhar recompensas adicionais.
- Perfil do Usuário: Visualize e edite seu perfil, veja suas estatísticas e conquistas.

## Tecnologias Utilizadas

- Frontend: React
- Backend: Node.js com Fastify
- Banco de Dados: Supabase (PostgreSQL)
- Autenticação: JWT
- Documentação da API: Swagger

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

- Fork o repositório.
- Crie uma branch para sua feature (git checkout -b feature/nova-feature).
- Commit suas mudanças (git commit -am 'Adiciona nova feature').
- Faça push para a branch (git push origin feature/nova-feature).
- Crie um novo Pull Request.

## Autor

<table >
  <tr>
    <br />
	<td align="center"><a href="https://www.linkedin.com/in/jessica-fernanda-programadora"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/80687429?v=4" width="100px;" alt=""/><br /><sub><b>Jessica Fernanda</b></sub></a><br />

  </tr>

<div align="right">
  <b><a href="#visão-geral">↥ back to top</a></b>
</div>
