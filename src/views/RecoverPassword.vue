<template>
  <div class="recover-password">
    <ContentLoader v-if="isRequestProcessing == true" />

    <div class="container">
      <div class="row">
        <div class="col">
          <div class="d-flex flex-row justify-content-center">
            <div class="login-form">
              <form @submit.prevent="submit">
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
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Email"
                    required="required"
                    v-model="form.email"
                  />
                </div>
                <input
                  type="submit"
                  class="btn btn-primary btn-block btn-lg"
                  value="Reset password"
                />
              </form>
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

export default {
  name: "ResetPassword",
  components: {
    ContentLoader,
    Alert,
  },
  data() {
    return {
      form: {
        email: "",
      },
      message: "",
      isError: false,
      isRequestProcessing: false,
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
