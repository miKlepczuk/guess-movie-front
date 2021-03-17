<template>
  <div class="reset-password">
    <div class="login-form">
      <form action="" method="post">
        <div class="avatar"><img src="../assets/images/avatar.svg" /></div>
        <h4 class="modal-title">Reset password</h4>
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            placeholder="Email"
            required="required"
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
</template>

<script>
</script>

<style scoped>
@import "../assets/css/login-form.css";
</style>
