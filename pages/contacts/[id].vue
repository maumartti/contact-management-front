<template>
  <div>

    <div class="container d-flex justify-content-between p-3">
      <button class="btn btn-light" @click="$router.push('/contacts')">
        <IconCSS name="ep:back" /> Back
      </button>
      <button class="btn btn-dark" @click="logout">Logout</button>
    </div>

    <div v-if="contactData" class="container pt-3">
      <div class="d-flex">
        <img :src="baseUrl+'/images/contacts/'+contactData.image" class="user-photo img-fluid rounded-circle me-3" style="width:74px;height:74px;">
        <div class="pt-2">
          <h3 class="">{{ contactData.name }}</h3>
          <p class="mt-0">{{ contactData.address }}</p>
        </div>
      </div>
      <div class="full-height">
        <div class="container pt-3 px-0">
          <div v-if="contactData">
            <ul class="list-group no-borders">
              <li class="list-group-item border-0 px-0">
                <h4>Address</h4>
                <p>{{ contactData.address }}</p>
              </li>
              <li class="list-group-item border-0 px-0">
                <h4>Phone</h4>
                <p>{{ contactData.tel }}</p>
              </li>
              <li class="list-group-item border-0 px-0">
                <h4>Email</h4>
                <p>{{ contactData.email }}</p>
              </li>
            </ul>
            <div class="mb-3">
              <button type="button" @click="$router.push('/contacts/edit/'+contactData.id)" class="btn btn-primary rounded-pill w-100">EDIT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '~/stores/auth';
import { useContactsStore } from '~/stores/contacts';
import { onMounted, ref } from 'vue';


definePageMeta({
  middleware: "auth",
})

export default {
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

    //logout action
    const authStore = useAuthStore();
    const logout = () => {
      authStore.logout();
    };

    return { 
      id, 
      contactData,
      baseUrl,
      logout
    };
  },
};
</script>