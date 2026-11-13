export function formatarData(data) {
    const partes = data.split("-");
    return partes[2] + "/" + partes[1];
}

export function nomearTipo(tipo) {
    if (tipo === "prova") {
        return "Prova";
    }

    if (tipo === "trabalho") {
        return "Trabalho";
    }

    return "Apresentação";
}

export function ordenarPorData(entregas) {
    return [...entregas].sort(function (a, b) {
        return a.data.localeCompare(b.data);
    });
}

export function filtrarPendentes(entregas) {
    return entregas.filter(function (entrega) {
        return !entrega.feita;
    });
}

export function passaNoFiltro(entrega, tipoEscolhido) {
    return tipoEscolhido === "tudo" ||
        entrega.tipo === tipoEscolhido;
}

export function montarTextoDaProxima(entregas) {
    const pendentes = ordenarPorData(filtrarPendentes(entregas));

    if (pendentes.length === 0) {
        return "Nada pendente";
    }

    const proxima = pendentes[0];

    return proxima.materia + " — " + formatarData(proxima.data);
}