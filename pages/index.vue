<template>
  <Form @submit="onSubmit" :validation-schema="schema" class="needs-validation container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
      <h1 class="text-center h1">Welcome</h1>
        <div class="card mt-4 border-0">
          <div class="card-body border-0">
            <div v-if="state.error" class="text-danger text-center my-3">
              {{ state.error }}
            </div>
            <InputText
              name="email"
              type="text"
              :rules="schema.fields.email"
              placeholder="Enter your email"
            />
            <InputText
              name="password"
              type="password"
              :rules="schema.fields.password"
              placeholder="Enter your password"
            />
            <div class="mb-3">
              <button type="submit" class="btn btn-primary rounded-pill w-100">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Form>
</template>


<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

definePageMeta({
  middleware: "guest",
})

export default defineComponent({
  components: { Form, Field },
  setup() {
    const state = reactive({
      error: null,
    });

    const schema = yup.object({
      email: yup.string().required().email().max(64).label('Your Email'),
      password: yup.string().required().min(8).max(30).label('Your Password'),
    });

    const authStore = useAuthStore();
    const router = useRouter();

    const onSubmit = async (values) => {
      try {
        await authStore.login(values.email, values.password);
        router.push('/contacts');
      } catch (error) {
        state.error = error;
      }
    };

    return {
      schema,
      state,
      onSubmit,
    };
  },
});
</script>

<style>
.h1{
  font-size: 48px !important;
}
</style>