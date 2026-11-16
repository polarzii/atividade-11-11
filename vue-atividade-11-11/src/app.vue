
<script setup>
import { ref, computed, watch } from "vue";

import ResumoAgenda from "./components/ResumoAgenda.vue";
import ItemEntrega from "./components/ItemEntrega.vue";
import FormularioEntrega from "./components/FormularioEntrega.vue";

import {
    ordenarPorData,
    filtrarPendentes,
    passaNoFiltro,
    montarTextoDaProxima
} from "./agenda.js";

const chave = "agenda-de-entregas";

const exemplos = [
    {
        id: 1,
        materia: "Matemática",
        tipo: "prova",
        data: "2026-11-18",
        feita: false
    },
    {
        id: 2,
        materia: "História",
        tipo: "trabalho",
        data: "2026-11-25",
        feita: false
    },
    {
        id: 3,
        materia: "Português",
        tipo: "trabalho",
        data: "2026-11-10",
        feita: true
    },
    {
        id: 4,
        materia: "Inglês",
        tipo: "apresentacao",
        data: "2026-11-20",
        feita: false
    }
];

function carregarEntregas() {
    const dadosSalvos = localStorage.getItem(chave);

    if (dadosSalvos === null) {
        return exemplos;
    }

    try {
        const dados = JSON.parse(dadosSalvos);

        if (Array.isArray(dados)) {
            return dados;
        }

        return exemplos;
    } catch {
        return exemplos;
    }
}

const entregas = ref(carregarEntregas());

const tipoEscolhido = ref("tudo");

const entregasFiltradas = computed(function () {
    const filtradas = entregas.value.filter(function (entrega) {
        return passaNoFiltro(entrega, tipoEscolhido.value);
    });

    return ordenarPorData(filtradas);
});

const totalPendentes = computed(function () {
    return filtrarPendentes(entregas.value).length;
});

const proximaEntrega = computed(function () {
    return montarTextoDaProxima(entregas.value);
});

function adicionarEntrega(novaEntrega) {
    entregas.value.push(novaEntrega);
}

function alternarFeita(entrega) {
    entrega.feita = !entrega.feita;
}

function apagarEntrega(entrega) {
    const indice = entregas.value.indexOf(entrega);

    if (indice !== -1) {
        entregas.value.splice(indice, 1);
    }
}

watch(
    entregas,
    function (novaLista) {
        localStorage.setItem(chave, JSON.stringify(novaLista));
    },
    { deep: true }
);
</script>

<template>
    <header class="topo">
        <h1>Agenda de entregas</h1>
        <p>Provas, trabalhos e apresentações em um só lugar.</p>
    </header>

    <main class="container">

        <ResumoAgenda
            :pendentes="totalPendentes"
            :proxima="proximaEntrega"
        />

        <FormularioEntrega
            @adicionar="adicionarEntrega"
        />

        <section class="cartao-modulo proximas-entregas">
            <h2>Próximas entregas</h2>

            <p>
                <label for="filtro-categoria">Mostrar</label>

                <select
                    id="filtro-categoria"
                    v-model="tipoEscolhido"
                >
                    <option value="tudo">Tudo</option>
                    <option value="prova">Só provas</option>
                    <option value="trabalho">Só trabalhos</option>
                    <option value="apresentacao">Só apresentações</option>
                </select>
            </p>

            <ul class="lista">

                <ItemEntrega
                    v-for="entrega in entregasFiltradas"
                    :key="entrega.id"
                    :entrega="entrega"
                    @alternar="alternarFeita"
                    @apagar="apagarEntrega"
                />

            </ul>

            <p v-if="entregasFiltradas.length === 0" class="lista-vazia">
                Nada por aqui.
            </p>

        </section>

        <footer>
            <p>Feito por Kimmy</p>
        </footer>

    </main>
</template>
