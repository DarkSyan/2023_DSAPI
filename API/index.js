const express = require('express');
const mysql = require('mysql');

// Configurações do banco de dados
const configuracaoBancoDados = {
  host: 'localhost',
  user: 'admin',
  password: '',
  database: 'loja_dsapi',
};

const app = express();
app.use(express.json());

// Criação da conexão com o banco de dados
const conexao = mysql.createconexao(configuracaoBancoDados);

// Conexão ao banco de dados
conexao.connect((err) => {
  if (err) {
    console.error('Erro ao estabelecer conexão com o banco de dados:', err);
    return;
  }
  console.log('Conexão realizada com o banco de dados!');
});

// Rotas para a tabela "cidades"
// Rota get
app.get('/cidades', (req, res) => {
  conexao.query('SELECT * FROM cidades', (err, results) => {
    if (err) {
      console.error('Erro com o retorno da consulta:', err);
      res.status(500).json({ error: 'Erro ao consultar as cidades' });
      return;
    }
    res.json(results);
  });
});

//Rota post
app.post('/cidades', (req, res) => {
  const { nome } = req.body;
  const query = 'INSERT INTO cidades (nome) VALUES (?)';
  conexao.query(query, [nome], (err, result) => {
    if (err) {
      console.error('Erro com o retorno da consulta:', err);
      res.status(500).json({ error: 'Erro com comando create cidade' });
      return;
    }
    res.json({ id: result.insertId, nome });
  });
});

//Rota put
app.put('/cidades/:id', (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  const query = 'UPDATE cidades SET nome = ? WHERE id = ?';
  conexao.query(query, [nome, id], (err) => {
    if (err) {
      console.error('Erro com o retorno da consulta:', err);
      res.status(500).json({ error: 'Erro ao atualizar a cidade' });
      return;
    }
    res.json({ id, nome });
  });
});

//Rota delete
app.delete('/cidades/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM cidades WHERE id = ?';
  conexao.query(query, [id], (err) => {
    if (err) {
      console.error('Erro com o retorno da consulta:', err);
      res.status(500).json({ error: 'Erro ao excluir a cidade' });
      return;
    }
    res.json({ message: 'Cidade excluída' });
  });
});

// Rotas para a tabela "clientes"
//Rota get
app.get('/clientes', (req, res) => {
  conexao.query('SELECT * FROM clientes', (err, results) => {
    if (err) {
      console.error('Erro com o retorno da consulta:', err);
      res.status(500).json({ error: 'Erro ao consultar os clientes' });
      return;
    }
    res.json(results);
  });
});

//Rota post
app.post('/clientes', (req, res) => {
  const { nome, altura, nascimento, cidade_id } = req.body;
  const query = 'INSERT INTO clientes (nome, altura, nascimento, cidade_id) VALUES (?, ?, ?, ?)';
  conexao.query(query, [nome, altura, nascimento, cidade_id], (err, result) => {
    if (err) {
      console.error('Erro com o retorno da consulta:', err);
      res.status(500).json({ error: 'Erro com comando create cliente' });
      return;
    }
    res.json({ id: result.insertId, nome, altura, nascimento, cidade_id });
  });
});

//Rota put
app.put('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const { nome, altura, nascimento, cidade_id } = req.body;
  const query = 'UPDATE clientes SET nome = ?, altura = ?, nascimento = ?, cidade_id = ? WHERE id = ?';
  conexao.query(query, [nome, altura, nascimento, cidade_id, id], (err) => {
    if (err) {
      console.error('Erro com o retorno da consulta:', err);
      res.status(500).json({ error: 'Erro ao atualizar o cliente' });
      return;
    }
    res.json({ id, nome, altura, nascimento, cidade_id });
  });
});

//Rota delete
app.delete('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM clientes WHERE id = ?';
  conexao.query(query, [id], (err) => {
    if (err) {
      console.error('Erro com o retorno da consulta:', err);
      res.status(500).json({ error: 'Erro ao excluir o cliente' });
      return;
    }
    res.json({ message: 'Cliente excluído' });
  });
});

// Rotas para a tabela "pedidos"
//Rota get
app.get('/pedidos', (req, res) => {
  conexao.query('SELECT * FROM pedidos', (err, results) => {
    if (err) {
      console.error('Erro com o retorno da consulta:', err);
      res.status(500).json({ error: 'Erro ao consultar os pedidos' });
      return;
    }
    res.json(results);
  });
});

//Rota post
app.post('/pedidos', (req, res) => {
  const { horario, endereco, cliente_id } = req.body;
  const query = 'INSERT INTO pedidos (horario, endereco, cliente_id) VALUES (?, ?, ?)';
  conexao.query(query, [horario, endereco, cliente_id], (err, result) => {
    if (err) {
      console.error('Erro com o retorno da consulta:', err);
      res.status(500).json({ error: 'Erro com comando create pedido' });
      return;
    }
    res.json({ id: result.insertId, horario, endereco, cliente_id });
  });
});

//Rota put
app.put('/pedidos/:id', (req, res) => {
  const { id } = req.params;
  const { horario, endereco, cliente_id } = req.body;
  const query = 'UPDATE pedidos SET horario = ?, endereco = ?, cliente_id = ? WHERE id = ?';
  conexao.query(query, [horario, endereco, cliente_id, id], (err) => {
    if (err) {
      console.error('Erro com o retorno da consulta:', err);
      res.status(500).json({ error: 'Erro ao atualizar o pedido' });
      return;
    }
    res.json({ id, horario, endereco, cliente_id });
  });
});

//Rota delete
app.delete('/pedidos/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM pedidos WHERE id = ?';
  conexao.query(query, [id], (err) => {
    if (err) {
      console.error('Erro com o retorno da consulta:', err);
      res.status(500).json({ error: 'Erro ao excluir o pedido' });
      return;
    }
    res.json({ message: 'Pedido excluído' });
  });
});

// Rotas para a tabela "categorias"
//Rota get
app.get('/categorias', (req, res) => {
  conexao.query('SELECT * FROM categorias', (err, results) => {
    if (err) {
      console.error('Erro com o retorno da consulta:', err);
      res.status(500).json({ error: 'Erro ao consultar as categorias' });
      return;
    }
    res.json(results);
  });
});

//Rota post
app.post('/categorias', (req, res) => {
  const { nome } = req.body;
  const query = 'INSERT INTO categorias (nome) VALUES (?)';
  conexao.query(query, [nome], (err, result) => {
    if (err) {
      console.error('Erro com o retorno da consulta:', err);
      res.status(500).json({ error: 'Erro com comando create categoria' });
      return;
    }
    res.json({ id: result.insertId, nome });
  });
});

//Rota put
app.put('/categorias/:id', (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  const query = 'UPDATE categorias SET nome = ? WHERE id = ?';
  conexao.query(query, [nome, id], (err) => {
    if (err) {
      console.error('Erro com o retorno da consulta:', err);
      res.status(500).json({ error: 'Erro ao atualizar a categoria' });
      return;
    }
    res.json({ id, nome });
  });
});


//Rota delete
app.delete('/categorias/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM categorias WHERE id = ?';
  conexao.query(query, [id], (err) => {
    if (err) {
      console.error('Erro com o retorno da consulta:', err);
      res.status(500).json({ error: 'Erro ao excluir a categoria' });
      return;
    }
    res.json({ message: 'Categoria excluída' });
  });
});

// Rotas para a tabela "produtos"
//Rota get
app.get('/produtos', (req, res) => {
  conexao.query('SELECT * FROM produtos', (err, results) => {
    if (err) {
      console.error('Erro com o retorno da consulta:', err);
      res.status(500).json({ error: 'Erro ao consultar os produtos' });
      return;
    }
    res.json(results);
  });
});

//Rota post
app.post('/produtos', (req, res) => {
  const { nome, preco, quantidade, categoria_id } = req.body;
  const query = 'INSERT INTO produtos (nome, preco, quantidade, categoria_id) VALUES (?, ?, ?, ?)';
  conexao.query(query, [nome, preco, quantidade, categoria_id], (err, result) => {
    if (err) {
      console.error('Erro com o retorno da consulta:', err);
      res.status(500).json({ error: 'Erro com comando create produto' });
      return;
    }
    res.json({ id: result.insertId, nome, preco, quantidade, categoria_id });
  });
});

//Rota put
app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, preco, quantidade, categoria_id } = req.body;
  const query = 'UPDATE produtos SET nome = ?, preco = ?, quantidade = ?, categoria_id = ? WHERE id = ?';
  conexao.query(query, [nome, preco, quantidade, categoria_id, id], (err) => {
    if (err) {
      console.error('Erro com o retorno da consulta:', err);
      res.status(500).json({ error: 'Erro ao atualizar o produto' });
      return;
    }
    res.json({ id, nome, preco, quantidade, categoria_id });
  });
});

//Rota delete
app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM produtos WHERE id = ?';
  conexao.query(query, [id], (err) => {
    if (err) {
      console.error('Erro com o retorno da consulta:', err);
      res.status(500).json({ error: 'Erro ao excluir o produto' });
      return;
    }
    res.json({ message: 'Produto excluído' });
  });
});


// Rotas para a tabela "pedidos_produtos"
//Rota get
app.get('/pedidos_produtos', (req, res) => {
  conexao.query('SELECT * FROM pedidos_produtos', (err, results) => {
    if (err) {
      console.error('Erro com o retorno da consulta:', err);
      res.status(500).json({ error: 'Erro ao consultar os pedidos de produtos' });
      return;
    }
    res.json(results);
  });
});

//Rota post
app.post('/pedidos_produtos', (req, res) => {
  const { pedido_id, produto_id, preco, quantidade } = req.body;
  const query = 'INSERT INTO pedidos_produtos (pedido_id, produto_id, preco, quantidade) VALUES (?, ?, ?, ?)';
  conexao.query(query, [pedido_id, produto_id, preco, quantidade], (err, result) => {
    if (err) {
      console.error('Erro com o retorno da consulta:', err);
      res.status(500).json({ error: 'Erro com comando create pedido de produto' });
      return;
    }
    res.json({ pedido_id, produto_id, preco, quantidade });
  });
});

//Rota put
app.put('/pedidos_produtos/:pedido_id/:produto_id', (req, res) => {
  const { pedido_id, produto_id } = req.params;
  const { preco, quantidade } = req.body;
  const query = 'UPDATE pedidos_produtos SET preco = ?, quantidade = ? WHERE pedido_id = ? AND produto_id = ?';
  conexao.query(query, [preco, quantidade, pedido_id, produto_id], (err) => {
    if (err) {
      console.error('Erro com o retorno da consulta:', err);
      res.status(500).json({ error: 'Erro ao atualizar o pedido de produto' });
      return;
    }
    res.json({ pedido_id, produto_id, preco, quantidade });
  });
});

//Rota delete
app.delete('/pedidos_produtos/:pedido_id/:produto_id', (req, res) => {
  const { pedido_id, produto_id } = req.params;
  const query = 'DELETE FROM pedidos_produtos WHERE pedido_id = ? AND produto_id = ?';
  conexao.query(query, [pedido_id, produto_id], (err) => {
    if (err) {
      console.error('Erro com o retorno da consulta:', err);
      res.status(500).json({ error: 'Erro ao excluir o pedido de produto' });
      return;
    }
    res.json({ message: 'Pedido de produto excluído' });
  });
});

// Iniciar o servidor na porta 8002
app.listen(8002, () => {
  console.log('Servidor iniciado na porta 8002');
});
