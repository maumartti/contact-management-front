<template>
  <div class="mb-3">
    <Field :name="name" :type="type" :rules="validateRules" :placeholder="placeholder" v-slot="{ field, errorMessage, meta }"
    :validateOnBlur="false" :validateOnChange="true" :validateOnInput="true">

      <input v-bind="field" class="form-control rounded-3" />
      <span class="text-danger" v-if="errorMessage">{{ errorMessage }}</span>
      <span class="text-success" v-if="meta.valid && meta.touched">Field is valid</span>
      
    </Field>
  </div>
</template>

<script setup>
import { Field } from 'vee-validate';

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  validateRules: {
    type: Object,
    default: null,
  },
});

</script>

<!-- Opcional: Estilos CSS para el componente -->
<style scoped>
/* Agrega tus estilos específicos aquí si es necesario */
</style>
