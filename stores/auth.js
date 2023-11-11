import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => {
    // return {
    //   token: '',
    //   user: null,
    //   isAuthenticated: false,
    // }
  },
  persist: true,
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });

        const token = useCookie('token')
        token.value = response.data.token

      } catch (error) {
        if (error.response && error.response.data) {
          throw new Error(error.response.data.error);
        } else {
          console.error('Error al iniciar sesión:', error);
          throw new Error('Error al iniciar sesión');
        }
      }
    },
    async logout() {
      document.cookie = 'token=; Max-Age=-1; SameSite=Strict';

    },
  },
})