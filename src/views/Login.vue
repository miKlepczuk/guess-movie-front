<template>
  <div class="login">
    <div class="login-form">
      <form @submit.prevent="submit">
        <div class="avatar"><img src="../assets/images/avatar.svg" /></div>
        <h4 class="modal-title">Login to Your Account</h4>
        <div class="alert alert-error" v-if="errorMessage.length > 0">
          {{ errorMessage }}
        </div>
        <div class="form-group">
          <input
            v-model="form.email"
            type="email"
            class="form-control"
            placeholder="Email"
            required="required"
          />
        </div>
        <div class="form-group">
          <input
            v-model="form.password"
            type="password"
            class="form-control"
            placeholder="Password"
            required="required"
          />
        </div>
        <div class="form-group small clearfix">
          <router-link class="forgot-link" :to="{ name: 'reset-password' }"
            >Forgot Password?</router-link
          >
        </div>
        <input
          type="submit"
          class="btn btn-primary btn-block btn-lg"
          value="Login"
        />
      </form>
      <div class="text-center small">
        Don't have an account?
        <router-link :to="{ name: 'register' }">Sign up</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errorMessage: "",
    };
  },

  methods: {
    ...mapActions(["LogIn"]),
    async submit() {
      let user = { email: this.form.email, password: this.form.password };
      try {
        await this.LogIn(user);
        this.$router.push({ name: "home" });
      } catch (error) {
        console.log(error);
        this.errorMessage =
          "The username or password did not match. Please try again.";
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/css/login-form.css";
</style>
