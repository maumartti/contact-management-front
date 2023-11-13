<template>
  <div>
    <div class="container pt-4">
        <div class="d-flex">
          <h1 class="">Add New Contact</h1>
        </div>
      <div class="full-height">
        <div class="container pt-0 px-0">
          <div>
            <Form @submit="onSubmit" :validation-schema="schema" class="needs-validation container mt-3">
            <ul class="list-group no-borders">
              <li class="list-group-item border-0 px-0">
                <h4>Name</h4>
                <InputText
                  name="name"
                  type="text"
                  :rules="schema.fields.name"
                  placeholder=""
                />
              </li>
              <li class="list-group-item border-0 px-0">
                <h4>Profile Picture</h4>
                <input type="file" class="form-control" />
              </li>
              <li class="list-group-item border-0 px-0">
                <h4>Address</h4>
                <InputText
                  name="address"
                  type="text"
                  :rules="schema.fields.address"
                  placeholder=""
                />
              </li>
              <li class="list-group-item border-0 px-0">
                <h4>Phone</h4>
                <InputText
                  name="tel"
                  type="text"
                  :rules="schema.fields.tel"
                  placeholder=""
                />
              </li>
              <li class="list-group-item border-0 px-0">
                <h4>Email</h4>
                <InputText
                  name="email"
                  type="text"
                  :rules="schema.fields.email"
                  placeholder=""
                />
              </li>
            </ul>
            <div class="mb-3 mt-4">
              <button type="button" class="btn btn-primary rounded-pill w-100">ADD CONTACT</button>
            </div>
            </Form> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { onMounted, ref } from 'vue';

definePageMeta({
  layout: "authentication",
  middleware: "auth",
})

export default defineComponent({
  components: { Form, Field },
  setup() {
    const config = useRuntimeConfig();
    const baseUrl = ref(config.public.BASE_URL);

    // Obtener datos del usuario basado en el ID
    onMounted(() => {

    });

    const schema = yup.object({
      name: yup.string().required().max(20).label('Name'),
      address: yup.string().required().max(255).label('address'),
      tel: yup.string().required().max(12).label('tel'),
      email: yup.string().required().email().max(36).label('email'),
    });

    return { 
      baseUrl,
      schema
    };
  },
});
</script>