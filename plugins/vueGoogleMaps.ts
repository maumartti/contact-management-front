import VueGoogleMaps from "@fawmi/vue-google-maps"

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public
  nuxtApp.vueApp.use(VueGoogleMaps, {
    load: {
      key:'AIzaSyCL_t8PpAJ8ngFVGetxVeET4j2RWkyVK4E',
      libraries:'places'
    },
  })
})