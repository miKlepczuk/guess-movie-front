<template>
  <div class="reset-password">
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
                <p>Create a new password for your account.</p>

                <Alert :isError="isError" :message="message" />

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
                  value="Reset password"
                />
              </Form>
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
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    });
    return {
      form: {
        password: "",
        confirmPassword: "",
        recoveryKey: "",
      },
      message: "",
      isError: false,
      isRequestProcessing: false,
      schema,
    };
  },

  methods: {
    ...mapActions(["resetPassword"]),
    async submit() {
      this.isRequestProcessing = true;
      try {
        this.form.recoveryKey = this.$route.query.recovery_key;
        await this.resetPassword(this.form);
        this.isError = false;
        this.message = "Your password has been changed";
        new Promise((resolve) => {
          setTimeout(() => {
            this.$router.push({ name: "login" });
            resolve();
          }, 3000);
        });
      } catch (error) {
        this.isError = true;
        this.message = error.response.data.message;
      }
      this.isRequestProcessing = false;
    },
  },
};
</script>

<style scoped>
@import "../assets/css/login-form.css";
</style>
