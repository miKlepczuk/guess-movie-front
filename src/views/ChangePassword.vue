<template>
  <div class="change-password">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="d-flex flex-row justify-content-center">
            <div class="login-form">
              <form @submit.prevent="submit">
                <div class="avatar">
                  <img src="../assets/images/avatar.svg" />
                </div>
                <h4 class="modal-title">Change password</h4>

                <div class="alert alert-error" v-if="isError">
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
  name: "ChangePassword",
  data() {
    return {
      form: {
        password: "",
        confirmPassword: "",
      },
      errorMessage: "",
      isError: false,
      isSubmited: false,
    };
  },

  methods: {
    ...mapActions(["changePassword"]),
    async submit() {
      try {
        this.isError = false;
        await this.changePassword(this.form);
        alert("Your password has been changed");
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
