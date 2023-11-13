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
                <InputText
                  name="image"
                  type="text"
                  :rules="schema.fields.image"
                  placeholder=""
                />
              </li>
              <li class="list-group-item border-0 px-0">
                <h4>Address</h4>
                <InputAddressGMap
                  name="address"
                  type="text"
                  :rules="schema.fields.address"
                  placeholder=""
                  @place-selected="setPlace"
                />
              </li>
              <li class="list-group-item border-0 px-0">
                <h4>Phone</h4>
                <InputText
                  name="tel"
                  type="text"
                  :rules="schema.fields.tel"
                  placeholder="write an address..."
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
            <div class="mb-3 mt-2">
              <button type="submit" class="btn btn-primary rounded-pill w-100">ADD CONTACT</button>
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
    const state = reactive({ error: null, success:null});
    const contactsStore = useContactsStore();

    // onMounted(() => {
    // });

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
        const create = await contactsStore.createContact(values);
        if (create) {
          state.success = 'Contact created successfully';
        }
      } catch (error) {
        state.error = error;
      }
    };

    return {
      schema,
      setPlace,
      state,
      onSubmit
    };
  },
});
</script>