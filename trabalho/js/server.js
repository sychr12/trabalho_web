const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

// Criação do servidor Express
const app = express();
const port = 5500;

// Middlewares
app.use(bodyParser.json());  // Para ler dados JSON enviados no corpo da requisição
app.use(express.static(path.join(__dirname, 'public')));  // Serve arquivos estáticos (HTML, CSS, JS)

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',        // Seu usuário do MySQL
    password: 'teste1819',        // Sua senha do MySQL
    database: 'registro' // Nome do banco de dados
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado ao banco de dados');
});

// Rota para registrar um novo usuário
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Previne SQL Injection utilizando parâmetros na query
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    
    db.execute(query, [username, password], (err, results) => {
        if (err) {
            console.error('Erro ao registrar usuário:', err);
            return res.status(500).json({ success: false, message: 'Erro ao registrar usuário' });
        }
        res.json({ success: true });
    });
});

// Rota para login (verificação de usuário e senha)
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

    db.execute(query, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao fazer login' });
        }

        if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
