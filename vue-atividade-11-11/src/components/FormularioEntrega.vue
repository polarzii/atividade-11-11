
<script setup>
import { ref } from "vue";

const emit = defineEmits(["adicionar"]);

const materia = ref("");
const tipo = ref("");
const data = ref("");

function limparFormulario() {
    materia.value = "";
    tipo.value = "";
    data.value = "";
}

function enviarEntrega() {
    const materiaLimpa = materia.value.trim();

    if (materiaLimpa === "" || tipo.value === "" || data.value === "") {
        return;
    }

    const novaEntrega = {
        id: Date.now(),
        materia: materiaLimpa,
        tipo: tipo.value,
        data: data.value,
        feita: false
    };

    emit("adicionar", novaEntrega);

    limparFormulario();
}
</script>

<template>
    <section class="cartao-modulo nova-entrega">
        <h2>Nova entrega</h2>

        <form @submit.prevent="enviarEntrega">

            <p>
                <label for="materia">Matéria</label>

                <input
                    type="text"
                    id="materia"
                    v-model="materia"
                    placeholder="Ex.: Matemática"
                    required
                >
            </p>

            <p>
                <label for="categoria">Tipo</label>

                <select id="categoria" v-model="tipo" required>
                    <option value="">Escolha o tipo</option>
                    <option value="prova">Prova</option>
                    <option value="trabalho">Trabalho</option>
                    <option value="apresentacao">Apresentação</option>
                </select>
            </p>

            <p>
                <label for="date">Data</label>

                <input
                    type="date"
                    id="date"
                    v-model="data"
                    required
                >
            </p>

            <button type="submit">Adicionar</button>

        </form>
    </section>
</template>
