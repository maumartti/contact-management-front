<template>
  <div class="mb-3">
    <Field :name="name" :type="type" :value="value" :rules="validateRules" :placeholder="placeholder" v-slot="{ field, errorMessage, meta }"
    :validateOnBlur="false" :validateOnChange="true" :validateOnInput="true" @place="onPlaceSelected">

      <GMapAutocomplete v-bind="field"  class="form-control rounded-3" placeholder="write an address..." />
      <span class="text-danger" v-if="errorMessage">{{ errorMessage }}</span>
      <span class="text-success" v-if="meta.valid && meta.touched">Field is valid</span>
      
    </Field>
  </div>
</template>

<script setup>
import { Field } from 'vee-validate';
import { ref, defineEmits } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    default: "",
    required: false,
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

const { emit } = defineEmits(['place-selected']);

const onPlaceSelected = (selectedPlace) => {
  emit('place-selected', selectedPlace);
};
</script>