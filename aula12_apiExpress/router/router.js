import { Router } from "express";

const app = Router();

function rotaGet() {
    app.get('/', () => {
        console.log("Tá funcionando");
    });
    
}

export default rotaGet;