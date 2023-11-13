<template>
  <div>
    <div v-if="state">
      <div v-if="state.error" class="alert alert-danger" role="alert">
      {{state.error}} <IconCSS name="codicon:error" />
      </div>
      <div v-if="state.success" class="alert alert-success" role="alert">
      {{state.success}} <IconCSS name="el:ok-sign" />
      </div>
    </div>
    <div v-if="contactData" class="container pt-3">
      <div class="d-flex">
        <img :src="contactData.image" class="user-photo img-fluid rounded-circle me-3" style="width:74px;height:74px;">
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
                  v-model="contactData.name"
                />
              </li>
              <li class="list-group-item border-0 px-0">
                <h4>Profile Picture</h4>
                <InputText
                  name="image"
                  type="text"
                  :rules="schema.fields.image"
                  placeholder=""
                  :value="contactData.image"
                  v-model="contactData.image"
                />
                <!-- <input type="file" class="form-control" accept="image/jpeg" /> -->
              </li>
              <li class="list-group-item border-0 px-0">
                <h4>Address</h4>
                <InputAddressGMap
                  name="address"
                  type="text"
                  :rules="schema.fields.address"
                  placeholder=""
                  :value="contactData.address"
                  @place-selected="setPlace"
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
              <button type="submit" class="btn btn-primary rounded-pill w-100">SAVE</button>
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
    const state = reactive({ error: null, success:null});

    // Obtener datos del usuario basado en el ID
    onMounted(() => {
      const contacts = contactsStore.data.user.contacts;
      contactData.value = contacts.find(contact => contact.id == id);
    });

    const schema = yup.object({
      name: yup.string().required().max(20).label('Name'),
      image: yup.string().required().max(600).matches(/^(http|https):\/\/.*\.(jpg|jpeg|png)$/, { message: 'Image must start with http:// or https:// and end with .jpg, .jpeg, or .png' }).label('image'),
      address: yup.string().required().max(255).label('address'),
      tel: yup.number().integer('Must be an integer').required('Phone number is required').max(999999999999, 'Maximum 12 digits').label('tel'),
      email: yup.string().required().email().max(36).label('email'),
    });

    //input address Google Places API result select
    const selectedAddress = ref('');
    const setPlace = (val) => {
      selectedAddress.value = val;//changed de address by selected in input google map places
    };

    const onSubmit = async (values) => {
      try {
        values.address = selectedAddress.value || values.address;// replace for new address selected
        const update = await contactsStore.updateContact(values, id);
        if (update) {
          state.success = 'Contact updated successfully';
        }
      } catch (error) {
        state.error = error;
      }
    };

    return { 
      id, 
      contactData,
      schema,
      onSubmit,
      setPlace,
      state
    };
  },
});
</script>