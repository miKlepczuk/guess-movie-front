<template>
  <div class="register">
    <div class="login-form">
      <form action="" method="post">
        <div class="avatar"><img src="../assets/images/avatar.svg" /></div>
        <h4 class="modal-title">Sign up</h4>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Username"
            required="required"
          />
        </div>
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
        <div class="form-group">
          <input
            type="password_confirm"
            class="form-control"
            placeholder="Confirm password"
            required="required"
          />
        </div>

        <input
          type="submit"
          class="btn btn-primary btn-block btn-lg"
          value="Sign up"
        />
      </form>
      <div class="text-center small">
        Already have an account?
        <router-link :to="{ name: 'login' }">Sign in</router-link>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
@import "../assets/css/login-form.css";
</style>
