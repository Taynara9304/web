import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

//Banco de dados em memória
const users = [];

//Rota registro
router.post("/register", async (req, res) => {
    const {username, password} = req.body;

    const userExist = users.find((u) => u.username === username);

    if (userExist) {
        return res.status(400).json({ message: "Usuário já existe"});
    }

    const hashPassword = await bcrypt.hash(password, 10);
    users.push({username, password:hashPassword});
    res.json({ message: "Usuário registrado com sucesso" });
});

//Login
router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    const user = users.find((u) => u.username === username);
    if (user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Senha inválida" });
    }

    const token = jwt.sign((username), 'secreta123', {expiresIn:"1h"});
    res.json({token});

    //Rota protegida
    router.get('/profile', authMiddleware, (req, res) => {
        res.json({ message: `Bem vindo ${user}`})
    })
});

export default router;