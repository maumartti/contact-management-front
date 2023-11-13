<template>
  <div class="container pt-2">
    <h1>Contacts</h1>
    <div class="input-group mb-3 mt-4">
      <input v-model="searchText" @input="filterContacts" type="text" class="form-control" placeholder="Search..." aria-label="Search" aria-describedby="button-search">
      <button class="btn btn-outline-secondary" type="button" id="button-search">
        <IconCSS name="uil:search" />
      </button>
    </div>

    <ul class="list-group">
      <li v-for="(contact, index) in displayedContacts" :key="index" @click="$router.push('/contacts/'+contact.id)" class="list-group-item d-flex justify-content-between align-items-center">
        <div class="d-flex">
          <img :src="contact.image" class="user-photo img-fluid rounded-circle me-3" style="width: 72px;height:72px;" :alt="'contact ' + (index + 1)">
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
</template>

<script>
import { useContactsStore } from '~/stores/contacts';
import { onMounted, ref, computed } from 'vue';

definePageMeta({
  layout: "authentication",
  middleware: "auth",
})

export default {
  setup() {
    const contactsStore = useContactsStore();
    const user = ref({ contacts: [] });
    const searchText = ref('');

    onMounted(async () => {
      try {
        const userData = await contactsStore.getContactsUserAuth();
        if (userData && userData.user) {
          user.value = userData.user;
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    });

    const displayedContacts = computed(() => {
      if (!searchText.value) {
        return user.value.contacts;
      }
      return user.value.contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchText.value.toLowerCase())
      );
    });

    const filterContacts = () => {
      displayedContacts.value;
    };

    return {
      searchText,
      user,
      displayedContacts,
      filterContacts
    };
  },
};
</script>
