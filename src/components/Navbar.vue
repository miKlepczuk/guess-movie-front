<template>
  <div>
    <nav
      class="mb-4 navbar navbar-expand bg-unique fixed-top navbar-dark bg-dark"
    >
      <div class="container">
        <router-link
          :to="{ name: 'home' }"
          class="navbar-brand d-inline-block align-middle"
          href="#"
        >
          <img
            src="../assets/images/head.svg"
            class="d-inline-block align-middle"
            width="40"
          />
          Guess What
        </router-link>

        <button
          class="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent-3"
          aria-controls="navbarSupportedContent-3"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent-3">
          <ul class="navbar-nav ml-auto nav-flex-icons">
            <div class="float-right" v-if="isAuthorized == false">
              <router-link
                :to="{ name: 'register' }"
                class="btn btn-primary btn-outline-primary"
              >
                Sign up
              </router-link>
              <router-link :to="{ name: 'login' }" class="btn btn-primary">
                Sign in
              </router-link>
            </div>

            <li class="nav-item dropdown" v-if="isAuthorized == true">
              <a
                class="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src="../assets/images/user.svg"
                  class="user-avatar"
                  width="20"
                />
                <span class="user-email">{{ userEmail }}</span>
              </a>
              <div
                class="dropdown-menu dropdown-menu-right dropdown-unique"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <a class="dropdown-item" href="#">Logout</a>
                <a class="dropdown-item" href="#">Change password</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Navbar",
  computed: {
    ...mapGetters({ isAuthorized: "isAuthorized" }),
    ...mapGetters({ userEmail: "userEmail" }),
  },
};
</script>
<style scoped>
.navbar-dark {
  background: rgb(228, 228, 228);
}
.user-avatar {
  margin-right: 3px;
}

@media (max-width: 768px) {
  .user-email {
    display: none;
  }
}
</style>