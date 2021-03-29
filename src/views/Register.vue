<template>
  <div class="register">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="d-flex flex-row justify-content-center">
            <div class="login-form">
              <form @submit.prevent="submit">
                <div class="avatar">
                  <img src="../assets/images/avatar.svg" />
                </div>
                <h4 class="modal-title">Sign up</h4>

                <div class="alert alert-error" v-if="isError">
                  {{ errorMessage }}
                </div>

                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Email"
                    required="required"
                    v-model="form.email"
                  />
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
                    @change="isValidatePasswords()"
                  />
                </div>

                <input
                  type="submit"
                  class="btn btn-primary btn-block btn-lg"
                  value="Sign up"
                  :disabled="isError && isSubmited == false"
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

export default {
  name: "Register",
  data() {
    return {
      form: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      errorMessage: "",
      isError: false,
      isSubmited: false,
    };
  },

  methods: {
    ...mapActions(["register"]),
    async submit() {
      try {
        this.isError = false;
        await this.register(this.form);
        this.$router.push({ name: "home" });
      } catch (error) {
        this.isError = true;
        this.isSubmited = true;
        this.errorMessage = error.response.data.message;
      }
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
