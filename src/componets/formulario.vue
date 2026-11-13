<script setup>
import { ref } from "vue";

const emit = defineEmits(["adicionar"]);

const materia = ref("");
const tipo = ref ("");
const data = ref("");

function limparFormulario() {
    materia.value = "";
    tipo.value = "";
    data.value = "";
}

function enviarEntrega() {
    const materiaLimpa = materia.value.trim();

    if(materiaLimpa === "" || tipo.value === "" || data.value === "") {
        return;
    }

const novaEntrega = {
    id: Date.now(),
    materia: materiaLimpa,
    tipo: materiaLimpa,
    data: data.value,
    feita: false
};

emit("adicionar", novaEntrega);

limparFormulario();

}

</script>