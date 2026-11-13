<script setup>
import { ref, computed, watch } from "vue";

import ResumoAgenda from ".components/ResumoAgenda.vue";
import ItemEntrega from "./components/ItemEntrega.vue";
import FormularioEntrega from "./components/FormularioEntrega.vue";

import {
    ordernarPorData,
    filtrarPendentes,
    passaNoFiltro,
    montarTextoDaProxima
} from "./agenda.js";

const chave = "agenda-de-entregas";

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

    try{
        const dados = JSON.parse(dadosSalvos);

        if (Array.isArray(dados)) {
            return dados;
        }

        return exemplos;
    }catch{
        return exemplos;
    }


}
</script>