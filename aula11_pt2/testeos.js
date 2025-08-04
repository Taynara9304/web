import os from 'os';

export function obterInfoSistema() {
    return {
        sistema: os.type(),
        platforma: os.platform(),
        arquitetura: os.arch(),
        homedir: os.homedir(),
        tempoAtivo: (os.uptime() / 3600).toFixed(2) + " horas",
        qtdCPU: os.cpus().length,
        totalMemoria: os.totalmem(),
        usuarioAtual: os.hostname()
    }
}
