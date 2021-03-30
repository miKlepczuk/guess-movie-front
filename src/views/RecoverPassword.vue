<template>
  <div class="recover-password">
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
                <h4 class="modal-title">Reset Your Password</h4>
                <p>
                  Enter your email address below and we'll send you a link with
                  instructions.
                </p>
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
                <input
                  type="submit"
                  class="btn btn-primary btn-block btn-lg"
                  value="Reset password"
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
import ContentLoader from "@/components/ContentLoader.vue";
import Alert from "@/components/Alert.vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as Yup from "yup";

export default {
  name: "ResetPassword",
  components: {
    ContentLoader,
    Alert,
    Field,
    Form,
    ErrorMessage,
  },
  data() {
    const schema = Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
    });
    return {
      form: {
        email: "",
      },
      message: "",
      isError: false,
      isRequestProcessing: false,
      schema,
    };
  },

  methods: {
    ...mapActions(["recoverPassword"]),
    async submit() {
      this.message = "";
      try {
        this.isRequestProcessing = true;
        let form = { email: this.form.email };
        await this.recoverPassword(form);
        this.message = "Recovery email has been sent";
        this.isError = false;
      } catch (error) {
        this.message = error.response.data.message;
        this.isError = true;
      }
      this.isRequestProcessing = false;
    },
  },
};
</script>

<style scoped>
@import "../assets/css/login-form.css";
</style>
