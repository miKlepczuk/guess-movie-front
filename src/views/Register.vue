<template>
  <div class="register">
    <ContentLoader v-if="isRequestProcessing == true" />

    <div class="container">
      <div class="row">
        <div class="col">
          <div class="d-flex flex-row justify-content-center">
            <div class="login-form">
              <Form @submit="submit" :validation-schema="schema">
                <div class="avatar">
                  <img src="../assets/images/avatar.svg" />
                </div>
                <h4 class="modal-title">Sign up</h4>

                <Alert :isError="isError" :message="message" />

                <div class="form-group">
                  <Field
                    name="email"
                    class="form-control"
                    placeholder="Email"
                    v-model="form.email"
                    type="email"
                  />
                  <ErrorMessage class="field__error-message" name="email" />
                </div>

                <div class="form-group">
                  <Field
                    name="password"
                    class="form-control"
                    placeholder="Password"
                    v-model="form.password"
                    type="password"
                  />
                  <ErrorMessage class="field__error-message" name="password" />
                </div>

                <div class="form-group">
                  <Field
                    name="confirmPassword"
                    class="form-control"
                    placeholder="Confirm password"
                    v-model="form.confirmPassword"
                    type="password"
                  />
                  <ErrorMessage
                    class="field__error-message"
                    name="confirmPassword"
                  />
                </div>
                <input
                  type="submit"
                  class="btn btn-primary btn-block btn-lg"
                  value="Sign up"
                />
              </Form>
              <div class="text-center small">
                Already have an account?
                <router-link :to="{ name: 'login' }">Sign in</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Alert from "@/components/Alert.vue";
import ContentLoader from "@/components/ContentLoader.vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as Yup from "yup";

export default {
  name: "Register",
  components: {
    Alert,
    ContentLoader,
    Field,
    Form,
    ErrorMessage,
  },
  data() {
    const schema = Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    });
    return {
      form: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      isSubmited: false,
      message: "",
      isError: false,
      isRequestProcessing: false,
      schema,
    };
  },

  methods: {
    ...mapActions(["register"]),
    async submit() {
      try {
        this.isRequestProcessing = true;
        this.isError = false;
        this.message = "";
        await this.register(this.form);
        this.$router.push({ name: "home" });
      } catch (error) {
        this.message = error.response.data.message;
        this.isError = true;
      }
      this.isRequestProcessing = false;
    },
    isValidatePasswords() {
      if (this.form.password != this.form.confirmPassword) {
        this.errorMessage = "The password confirmation does not match";
        this.isError = true;
      } else if (this.form.password.length() < 6) {
        this.errorMessage = "Your password must be at least 6 characters long";
        this.isError = true;
      } else {
        this.errorMessage = "";
        this.isError = false;
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/css/login-form.css";
</style>
