<template>
  <div>
    <div class="container d-flex justify-content-between p-3">
      <button v-if="$router.currentRoute.value.path !== '/contacts'" class="btn btn-light" @click="$router.go(-1)">
        <IconCSS name="ep:back" /> Back
      </button>
      <button class="btn btn-success" @click="$router.push('/contacts/add')">Add New <IconCSS name="ic:baseline-plus"/></button>
      <button class="btn btn-dark" @click="logout">Logout <IconCSS name="material-symbols:logout"/></button>
    </div>
  </div>
</template>

<script >
import { useAuthStore } from '~/stores/auth';

export default {
  setup() {
    //logout action
    const authStore = useAuthStore();
    const logout = () => {
      authStore.logout();
    };

    return {
      logout
    };
  },
};
</script>