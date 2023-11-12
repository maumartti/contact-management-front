import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      //token: '',
      //user: null,
      //isAuthenticated: false,
    }
},
  persist: true,
  actions: {
    async login(email, password) {
      const config = useRuntimeConfig();
      const { data: response, error } = await useFetch(`${config.public.API_BASE_URL}/login`, {
        method: 'post',
        body: { 
          email: email,
          password: password,
        }
      });
      if(response && response.value) {
        const token = useCookie('token');
        token.value = response.value.token;
        //this.user = response.value.user;
      } else if(error.value.data.error){
        throw new Error(error.value.data.error);
      }
    },
    async getUser() {
      const token = useCookie('token')
      const config = useRuntimeConfig();
      const { data } = await useFetch(`${config.public.API_BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      if (data && data.value) {
        return data.value;
      }
    },
    async logout() {
      const router = useRouter();
      document.cookie = 'token=; Max-Age=-1; SameSite=Strict';
      router.push('/')
    },
  },
})