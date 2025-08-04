import { obterInfoSistema  } from "./testeos.js";
// const calc = require("./calculadora");
// const calc2 = require("./calculadora2");

// console.log("Soma: ", calc.somar(5, 5));
// console.log("Multiplicação: ", calc.multiplicar(5, 5));
// console.log("Subtração: ", calc2.subtrair(5, 5));
// console.log("Divisão: ", calc2.dividir(5, 5));

const info = obterInfoSistema();
console.log("Informações do S.O.: ", info);
