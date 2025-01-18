// Importa módulos necessários
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

// Configuração do banco de dados (hardcoded)
const pool = new Pool({
  user: "admin",
  host: "postgres-db", // Nome do contêiner
  database: "customerdb",
  password: "admin",
  port: 5432,
});

// Cria o app Express
const app = express();
const PORT = 3000;

// Middleware para parsing de JSON
app.use(express.json());
app.use(cors());

// Endpoint GET para buscar todos os clientes
app.get("/customers", async (req, res) => {
  try {
    console.log("Buscando clientes...");
    const result = await pool.query("SELECT * FROM customers");
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    res.status(500).json({ error: "Erro ao buscar clientes." });
  }
});

// Endpoint POST para cadastrar um novo cliente
app.post("/customers", async (req, res) => {
  console.log("Cadastrando cliente...");

  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'O campo "name" é obrigatório.' });
  }

  try {
    const result = await pool.query("INSERT INTO customers (name) VALUES ($1) RETURNING *", [name]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
    res.status(500).json({ error: "Erro ao cadastrar cliente." });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
