<template>
  <div class="login">
    <div class="login-form">
      <form action="" method="post">
        <div class="avatar"><img src="../assets/images/avatar.svg" /></div>
        <h4 class="modal-title">Login to Your Account</h4>
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            placeholder="Email"
            required="required"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            required="required"
          />
        </div>
        <div class="form-group small clearfix">
          <a href="#" class="forgot-link">Forgot Password?</a>
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
</script>

<style scoped>
@import "../assets/css/login-form.css";
</style>
