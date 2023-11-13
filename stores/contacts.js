import { defineStore } from 'pinia';

export const useContactsStore = defineStore('contacts', {
  id: 'data',
  state: () => ({
    data: null,
  }),
  persist: true,
  actions: {
    async getContactsUserAuth() {
      const token = useCookie('token')
      const config = useRuntimeConfig();
      const { data } = await useFetch(`${config.public.API_BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      if (data && data.value) {
        this.data = data.value;
        return data.value;
      }
    },
  },
})