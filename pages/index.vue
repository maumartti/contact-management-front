<template>
  <Form @submit="onSubmit" :validation-schema="schema" class="needs-validation container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
      <h1 class="text-center">welcome</h1>
        <div class="card mt-5">
          <div class="card-body">
            <InputText
              name="email"
              type="text"
              :validate-rules="validateEmail"
              placeholder="Enter your email"
            />
            <InputText
              name="password"
              type="password"
              :validate-rules="validatePassword"
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


<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().required().email().label('Your Email'),
  password: yup.string().required().min(8).label('Your Password'),
});

function onSubmit(values) {
  // Submit values to API...
  alert(JSON.stringify(values, null, 2));
}
</script>