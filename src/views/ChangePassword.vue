<template>
  <div class="change-password">
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
                <h4 class="modal-title">Change password</h4>

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
                  value="Sign up"
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
import Alert from "@/components/Alert.vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import ContentLoader from "@/components/ContentLoader.vue";

export default {
  name: "ChangePassword",
  components: {
    Field,
    Form,
    ErrorMessage,
    Alert,
    ContentLoader,
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
        password: "",
        confirmPassword: "",
      },
      message: "",
      isError: false,
      isRequestProcessing: false,
      schema,
    };
  },

  methods: {
    ...mapActions(["changePassword"]),

    async submit() {
      try {
        this.isRequestProcessing = true;
        this.isError = false;
        await this.changePassword(this.form);
        this.message = "Your password has been changed";
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
