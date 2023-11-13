<template>
  <div>
    <div v-if="contactData" class="container pt-3">
      <div class="d-flex">
        <img :src="baseUrl+'/images/contacts/'+contactData.image" class="user-photo img-fluid rounded-circle me-3" style="width:74px;height:74px;">
        <div class="pt-2">
          <h3 class="">{{ contactData.name }}</h3>
          <p class="mt-0">{{ contactData.address }}</p>
        </div>
      </div>
      <div class="full-height">
        <div class="container pt-2 px-0">
          <div v-if="contactData">
            <Form @submit="onSubmit" :validation-schema="schema" class="needs-validation container mt-0">
            <ul class="list-group no-borders">
              <li class="list-group-item border-0 px-0">
                <h4>Name</h4>
                <InputText
                  name="name"
                  type="text"
                  :rules="schema.fields.name"
                  placeholder=""
                  :value="contactData.name"
                />
              </li>
              <li class="list-group-item border-0 px-0">
                <h4>Profile Picture</h4>
                <input type="file" class="form-control" />
              </li>
              <li class="list-group-item border-0 px-0">
                <h4>Address</h4>
                <InputAddressGMap
                  name="address"
                  type="text"
                  :rules="schema.fields.address"
                  placeholder=""
                  :value="contactData.address"
                />
              </li>
              <li class="list-group-item border-0 px-0">
                <h4>Phone</h4>
                <InputText
                  name="tel"
                  type="text"
                  :rules="schema.fields.tel"
                  placeholder=""
                  :value="contactData.tel"
                />
              </li>
              <li class="list-group-item border-0 px-0">
                <h4>Email</h4>
                <InputText
                  name="email"
                  type="text"
                  :rules="schema.fields.email"
                  placeholder=""
                  :value="contactData.email"
                />
              </li>
            </ul>
            <div class="mb-3 mt-2 mb-4">
              <button type="button" class="btn btn-primary rounded-pill w-100">SAVE</button>
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
import { useContactsStore } from '~/stores/contacts';
import { onMounted, ref } from 'vue';

definePageMeta({
  layout: "authentication",
  middleware: "auth",
})

export default defineComponent({
  components: { Form, Field },
  setup() {
    const { id } = useRoute().params;
    const contactsStore = useContactsStore();
    const contactData = ref(null);

    const config = useRuntimeConfig();
    const baseUrl = ref(config.public.BASE_URL);

    // Obtener datos del usuario basado en el ID
    onMounted(() => {
      const contacts = contactsStore.data.user.contacts;
      //console.log('contacts', contacts);
      contactData.value = contacts.find(contact => contact.id == id);
    });

    const schema = yup.object({
      name: yup.string().required().max(20).label('Name'),
      address: yup.string().required().max(255).label('address'),
      tel: yup.string().required().max(12).label('tel'),
      email: yup.string().required().email().max(36).label('email'),
    });

    return { 
      id, 
      contactData,
      baseUrl,
      schema
    };
  },
});
</script>