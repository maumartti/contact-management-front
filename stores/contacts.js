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
    async updateContact(contactData, id) {
      const token = useCookie('token');
      const config = useRuntimeConfig();

      const response = await useFetch(`${config.public.API_BASE_URL}/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify(contactData), // Aquí pasas los datos del contacto a actualizar
      });
      if (response.status.value == "success") { 
        this.data.user.contacts = response.data.value.contacts; // Actualiza la lista de contactos del userAuth en el store
        //console.log('data.user',this.data.user)
        return true
      } else {
        // Manejar errores, devolver un error, etc.
        throw new Error('Could not update contact');
      }
    },
  },
})