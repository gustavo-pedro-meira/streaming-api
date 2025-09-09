<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Streaming API README</title>
</head>
<body>

    <h1 align="center">API RESTful para Sistema de Streaming</h1>

    <p align="center">
        Uma API RESTful para um sistema de streaming que permite aos usuários gerenciar filmes, séries e suas plataformas de streaming favoritas.
    </p>

    <hr>

    <h2>&#x1F4DC; Sobre o Projeto</h2>
    <p>
        Esta é uma API RESTful para um sistema de Streaming, onde um usuário pode selecionar quais são seus serviços de streaming favoritos. A aplicação permite criar, ler, atualizar e deletar (CRUD) filmes e séries. Também é possível para um usuário definir e remover seus streamings favoritos.
    </p>
    <p>
        O objetivo principal é fornecer um backend organizado, funcional e escalável. Para facilitar a visualização e os testes dos endpoints, a documentação com <strong>Swagger</strong> foi implementada e está disponível na rota <code>/api</code>.
    </p>

    <hr>

    <h2>&#x1F6E0;&#xFE0F; Tecnologias Utilizadas</h2>
    <ul>
        <li><strong>Framework:</strong> NodeJS + NestJS</li>
        <li><strong>Banco de Dados:</strong> PostgreSQL</li>
        <li><strong>Containerização:</strong> Docker e Docker Compose</li>
        <li><strong>Linguagem:</strong> TypeScript</li>
    </ul>
    <p>
        A escolha pelo <strong>NestJS</strong> se deu por sua arquitetura organizada e bem definida, que facilita a manutenção e a escalabilidade da aplicação, além do forte uso de TypeScript. Optei pelo <strong>PostgreSQL</strong> por ser um sistema de gerenciamento de banco de dados relacional robusto e confiável.
    </p>

    <hr>

    <h2>&#x1F525; Pré-Requisitos</h2>
    <ul>
        <li>&#x2714;&#xFE0F; <a href="https://nodejs.org/en/">NodeJS</a></li>
        <li>&#x2714;&#xFE0F; <a href="https://www.docker.com/products/docker-desktop/">Docker e Docker Compose</a></li>
        <li>&#x2714;&#xFE0F; (Opcional) <a href="https://www.postman.com/">Postman</a> ou <a href="https://insomnia.rest/">Insomnia</a> para testes de API</li>
    </ul>

    <hr>

    <h2>&#x1F680; Como Começar</h2>
    <ol>
        <li>
            <p><strong>Clone o Repositório</strong></p>
            <pre><code>git clone https://github.com/gustavo-pedro-meira/streaming-api.git</code></pre>
        </li>
        <li>
            <p><strong>Suba os Containers Docker</strong></p>
            <p>Na raiz do projeto, execute o comando abaixo para iniciar a aplicação e o banco de dados:</p>
            <pre><code>docker-compose up --build -d</code></pre>
            <p>A API estará rodando em: <a href="http://localhost:3000">http://localhost:3000</a></p>
            <p>A documentação do Swagger estará disponível em: <a href="http://localhost:3000/api">http://localhost:3000/api</a></p>
        </li>
    </ol>

    <hr>

    <h2>&#x1F9EA; Rodando os Testes</h2>
    <p>Para executar os testes automatizados, utilize o seguinte comando:</p>
    <pre><code>npm test</code></pre>

    <hr>

    <h2>&#x1F517; Endpoints da API</h2>
    <p>Abaixo estão as imagens que descrevem os endpoints disponíveis na aplicação através do Swagger.</p>

    <h3>Endpoints de Autenticação e Usuários</h3>
    <img width="100%" alt="Endpoints de Autenticação e Usuários" src="https://github.com/user-attachments/assets/1c74a712-2eb1-4fe7-8d30-212784232ebf" />

    <h3>Endpoints de Filmes, Séries e Streamings</h3>
    <img width="100%" alt="Endpoints de Filmes, Séries e Streamings" src="https://github.com/user-attachments/assets/7dce874f-501b-427c-b7d2-096b88f8a91b" />

</body>
</html>