import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import middleware from './middleware/middleware.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const filePath = path.join(__dirname, '..', 'dados', 'usuarios.json');

function lerArquivo() {
    try {
        const dados = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(dados || '[]');
    } catch (error) {
        console.log("Erro ao ler arquivo");
        return [];
    }
}

function salvar(usuarios) {
    fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2));
}

router.get('/', (req, res) => {
    res.json(lerArquivo());
})

router.post("/", async (req, res) => {
    const usuarios = lerArquivo();

    const novoUsuario = {
        id: usuarios.length + 1,
        ...req.body
    }

    usuarios.push(novoUsuario);

    salvar(usuarios);

    res.status(201).json(novoUsuario);
});

//editar usuário
rotas.put('/:id', (req, res) => {
    const usuarios = lerArquivo();
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex((a) => a.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    usuarios[index] = { ...usuarios[index], ...req.body };

    salvarAlunos(usuarios);

    res.json(usuarios[index]);
});

// excluir usuário
rotas.delete('/:id', (req, res) => {
    let usuarios = lerArquivo();

    const id = parseInt(req.params.id);

    usuarios = usuarios.filter((a) => a.id !== id);
    salvarAlunos(usuarios);
    res.status(204).send();
})


export default rotas;