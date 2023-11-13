<template>
  <div>
    <div class="container pt-2">
      <h1>Contacts</h1>
      <div class="input-group mb-3 mt-4">
        <input type="text" class="form-control" placeholder="Search..." aria-label="Search" aria-describedby="button-search">
        <button class="btn btn-outline-secondary" type="button" id="button-search">
          <IconCSS name="uil:search" />
        </button>
      </div>

      <ul class="list-group">
        <li v-for="(contact, index) in user.contacts" :key="index" @click="$router.push('/contacts/'+contact.id)" class="list-group-item d-flex justify-content-between align-items-center">
          <div class="d-flex">
            <img :src="contact.image.includes('http') ? contact.image : baseUrl+'/images/contacts/'+contact.image" class="user-photo img-fluid rounded-circle me-3" style="width: 72px;" :alt="'contact ' + (index + 1)">
            <div>
              <h5>{{ contact.name }}</h5>
              <p>{{ contact.address }}</p>
            </div>
          </div>
          <span>
            <IconCSS name="ooui:next-ltr" />
          </span>
        </li>
      </ul>
    
    </div>
  </div>
</template>


<script>
import { useContactsStore } from '~/stores/contacts';
import { onMounted, ref } from 'vue';

definePageMeta({
  layout: "authentication",
  middleware: "auth",
})

export default {
  setup() {
    const config = useRuntimeConfig();
    const baseUrl = ref(config.public.BASE_URL);

    const contactsStore = useContactsStore();
    const user = ref({ contacts: [] });

    onMounted(async () => {
     //await refreshNuxtData(); // Refresh data to reload browser load data
      try {
        const userData = await contactsStore.getContactsUserAuth();
        if (userData && userData.user) {
          user.value = userData.user;
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    });

    return {
      baseUrl,
      user,
    };
  },
};
</script>
