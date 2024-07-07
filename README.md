# Sistema de Gestão de Pedidos e Produtos

Este projeto implementa um sistema de gestão de pedidos, que inclui o gerenciamento de clientes, produtos e categorias, utilizando Node.js com integração ao PostgreSQL.

## Instalação

Para começar com o projeto, siga estes passos simples:

### Clone o repositório:

```bash
git clone https:https://github.com/FuturoDEV-Fitness/carrinho-de-compras-renatapulz
```

## Instale as dependências:

```bash
npm install
```

## Configure o banco de dados:
- Certifique-se de ter o PostgreSQL instalado e configurado.
- Configure as variáveis de ambiente no arquivo database -> .connection.js com as informações do seu banco de dados.

## Inicie o servidor:

```bash
npm start
```

## Rotas Principais

- /clients: CRUD completo para clientes.
- /products: CRUD completo para produtos.
- /category: Operações para criar e excluir as categorias dos produtos.
- /orders: Operações para criar e excluir pedidos, com funcionalidades para adicionar e atualizar itens de pedido.
