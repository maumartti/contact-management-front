<template>
  <div>
    <h1>Contacts</h1>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script setup >
definePageMeta({
  middleware: "auth",
})

import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/');
};
</script>


