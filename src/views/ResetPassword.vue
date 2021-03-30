<template>
  <div class="reset-password">
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
                <p>Create a new password for your account.</p>

                <div
                  class="alert alert-success"
                  v-if="successMessage.length > 0"
                >
                  {{ successMessage }}
                </div>
                <div class="alert alert-danger" v-if="errorMessage.length > 0">
                  {{ errorMessage }}
                </div>

                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    required="required"
                    v-model="form.password"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Confirm password"
                    required="required"
                    v-model="form.confirmPassword"
                  />
                </div>
                <input
                  type="submit"
                  class="btn btn-primary btn-block btn-lg"
                  value="Reset password"
                  :disabled="errorMessage.length > 0 && isSubmited == false"
                />
              </form>
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

export default {
  name: "ResetPassword",
  components: {
    ContentLoader,
  },
  data() {
    return {
      form: {
        password: "",
        confirmPassword: "",
        recoveryKey: "",
      },
      errorMessage: "",
      successMessage: "",
      isSubmited: false,
      isRequestProcessing: false,
    };
  },

  methods: {
    ...mapActions(["resetPassword"]),
    async submit() {
      this.form.recoveryKey = this.$route.query.recovery_key;
      this.errorMessage = "";
      this.successMessage = "";
      this.isSubmited = false;

      this.isValidatePasswords();
      if (this.errorMessage.length == 0) {
        this.isRequestProcessing = true;

        try {
          await this.resetPassword(this.form);
          this.successMessage = "Your password has been changed";

          new Promise((resolve) => {
            setTimeout(() => {
              this.$router.push({ name: "login" });
              console.log("2 seconds up, resolving myTimerPromise");
              resolve();
            }, 3000);
          });
        } catch (error) {
          this.isSubmited = true;
          this.errorMessage = error.response.data.message;
        }
        this.isRequestProcessing = false;
      }
    },
    isValidatePasswords() {
      if (this.form.password != this.form.confirmPassword) {
        this.errorMessage = "The password confirmation does not match";
      } else if (this.form.password.length < 6) {
        this.errorMessage = "Your password must be at least 6 characters long";
      } else {
        this.errorMessage = "";
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/css/login-form.css";
</style>
