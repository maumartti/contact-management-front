export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      BASE_URL: process.env.BASE_URL
    }
  },
  // Resto de tu configuración...
  devtools: { enabled: true },
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
  ],
  modules: [
    '@pinia/nuxt',
    'nuxt-icon',
    [
      '@vee-validate/nuxt',
      {
        autoImports: true,
        componentNames: {
          Form: 'VeeForm',
          Field: 'VeeField',
          FieldArray: 'VeeFieldArray',
          ErrorMessage: 'VeeErrorMessage',
        },
      },
    ],
  ],
})
