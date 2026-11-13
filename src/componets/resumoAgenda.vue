<script setup>
defineProps({
    pendentes: Number,
    proxima: String,
});
</script>

<template>
    <section class="cartao-modulo resumo">
<h2>Resumo</h2>

<p>
    Pendentes
    <strong>{{ pendentes }}</strong>
</p>
<p>
    Próxima entrega
    <strong>{{ proxima }}</strong>
</p>
    </section>
</template>