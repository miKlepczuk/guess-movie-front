<template>
  <nav class="navbar navbar-expand bg-unique fixed-top navbar-dark bg-dark">
    <div class="container">
      <router-link
        :to="{ name: 'home' }"
        class="navbar-brand d-inline-block align-middle"
      >
        <img
          src="../assets/images/head.svg"
          class="d-inline-block align-middle brand-image"
        />
        <span class="brand-name">Guess movie</span>
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
              <router-link :to="{ name: 'HowToPlay' }" class="dropdown-item">
                How to play
              </router-link>
              <router-link
                :to="{ name: 'ChangePassword' }"
                class="dropdown-item"
              >
                Change password
              </router-link>

              <a class="dropdown-item" @click="logout">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters({ isAuthorized: "isAuthorized" }),
    ...mapGetters({ userEmail: "userEmail" }),
  },
  methods: {
    ...mapActions(["logOut"]),
    logout() {
      this.logOut();
      this.$router.push({ name: "login" });
    },
  },
};
</script>
<style scoped>
.navbar {
  height: 55px;
}
.brand-name {
  font-family: "Londrina Solid", cursive;
}
.brand-image {
  height: 35px;
}
.navbar-dark {
  background: rgb(228, 228, 228);
}
.user-avatar {
  margin-right: 3px;
}
.nav-item.dropdown {
  cursor: pointer;
}
@media (max-width: 768px) {
  .user-email {
    display: none;
  }
  .navbar-brand {
    margin-right: 5px;
  }
}
</style>