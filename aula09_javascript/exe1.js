document.addEventListener('DOMContentLoaded', function() {
    const resultado = document.getElementById('resultado');
    const numeros = document.querySelectorAll('.num');
    let expressao = '';
    const MAX_DIGITOS = 11;
    
    numeros.forEach(numero => {
        numero.addEventListener('click', function() {
            const valor = this.textContent;
            
            switch(valor) {
                case 'C':
                    expressao = '';
                    break;
                case '<':
                    expressao = expressao.slice(0, -1);
                    break;
                case '=':
                    try {
                        let exprParaCalcular = expressao.replace(/×/g, '*').replace(/÷/g, '/');
                        const resultadoCalculado = eval(exprParaCalcular);
                        expressao = resultadoCalculado.toString().slice(0, MAX_DIGITOS);
                    } catch (e) {
                        expressao = 'Erro';
                    }
                    break;
                default:
                    if (expressao.length < MAX_DIGITOS) {
                        expressao += valor;
                    }
            }
            
            resultado.textContent = expressao || '0';
        });
    });
});