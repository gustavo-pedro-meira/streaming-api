<h1 align="center">API RESTful para Sistema de Streaming</h1>

<p align="center">
    Uma API RESTful para um sistema de streaming que permite aos usuários gerenciar filmes, séries e suas plataformas de streaming favoritas.
</p>

---

## Sobre o Projeto
Esta é uma API RESTful para um sistema de Streaming, onde um usuário pode selecionar quais são seus serviços de streaming favoritos. A aplicação permite criar, ler, atualizar e deletar (CRUD) filmes e séries. Também é possível para um usuário definir e remover seus streamings favoritos.

O objetivo principal é fornecer um backend organizado, funcional e escalável. Para facilitar a visualização e os testes dos endpoints, a documentação com **Swagger** foi implementada e está disponível na rota `/api`.

---

## Tecnologias Utilizadas
- **Framework:** NodeJS + NestJS
- **Banco de Dados:** PostgreSQL
- **Containerização:** Docker e Docker Compose
- **Linguagem:** TypeScript

A escolha pelo **NestJS** se deu por sua arquitetura organizada e bem definida, que facilita a manutenção e a escalabilidade da aplicação, além do forte uso de TypeScript. Optei pelo **PostgreSQL** por ser um sistema de gerenciamento de banco de dados relacional robusto e confiável.

---

## Pré-Requisitos
- ✅ [NodeJS](https://nodejs.org/en/)
- ✅ [Docker e Docker Compose](https://www.docker.com/products/docker-desktop/)
- ✅ (Opcional) [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) para testes de API

---

## Como Rodar
    A aplicação só é possivel rodar utilizando o Docker.

1.  **Clone o Repositório**
    ```bash
    git clone https://github.com/gustavo-pedro-meira/streaming-api
    ```

2.  **Suba os Containers Docker**
    
    Na raiz do projeto, execute o comando abaixo para iniciar a aplicação e o banco de dados:
    ```bash
    docker-compose up --build -d
    ```
    A API estará rodando em: <a href="http://localhost:3000">http://localhost:3000</a>
    
    A documentação do Swagger estará disponível em: <a href="http://localhost:3000/api">http://localhost:3000/api</a>

---

## EndPoints
<img width="1810" height="403" alt="image" src="https://github.com/user-attachments/assets/045dde11-618b-4384-91b3-c3c9db4867b9" />
<img width="1807" height="338" alt="image" src="https://github.com/user-attachments/assets/948c56dc-807a-4d81-9ba8-e8f0ca71907a" />



## Rodando os Testes
Para executar os testes automatizados, utilize o seguinte comando:
```bash
npm test
