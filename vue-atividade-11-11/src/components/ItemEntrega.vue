<script setup>
import { formatarData, nomearTipo } from "../agenda";

defineProps({
    entrega: Object,
});

const emit = defineEmits(["alternar", "apagar"]);
</script>

<template>
    <li
     class="entrega item-lista"
     :class="{ feita: entrega.feita }"
     :data-tipo="entrega.tipo"
>
</li>

<div>
    <span class="data-texto">
        {{ formatarData(entrega.data) }}
    </span>

    <strong>{{ entrega.materia }}</strong>

    <span class="tag">
        {{ nomearTipo(entrega.tipo) }}
    </span>
</div>

<div class="botoes">

    <button 
        v-if="entrega.feita" 
        type="button" 
        class="botao-feita" 
        @click="emit('alternar', entrega)"
        >
Reabrir
    </button>

    <button 
        v-else 
        type="button" 
        class="botao-feita" 
        @click="emit('alternar', entrega)"
        >
Feita
    </button>

    <button 
        type="button" 
        class="botao-apagar" 
        @click="emit('apagar', entrega)"
        >
Apagar
    </button>

</div>

</template>