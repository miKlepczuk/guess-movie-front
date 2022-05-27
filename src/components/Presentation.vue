<template>
  <div class="presentation">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <h1 class="title">Guess movie</h1>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <p class="description">
            As the name suggests, Guess Movie is a film name guessing game based
            on video frame and a board with letters in random order to fill
            placeholders.
          </p>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <img src="../assets/images/home.jpg" />
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <router-link
            :to="{ name: btnLink }"
            class="btn btn-primary btn-lg btn-play"
          >
            {{ btnText }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Presentation",

  methods: {},
  created() {
    if (this.isAuthorized == true) {
      this.btnLink = "home";
      this.btnText = "Continue game";
    }
  },
  computed: {
    ...mapGetters(["isAuthorized"]),
  },
  watch: {},
  data() {
    return {
      btnLink: "login",
      btnText: "Let's play the game!",
    };
  },
};
</script>

<style scoped>
.title {
  font-family: "Londrina Solid", cursive;
  font-size: 50px;
  margin-bottom: 50px;
}

.description {
  margin-bottom: 50px;
}
img {
  margin-bottom: 60px;
  width: 600px;
  max-width: 100%;
}

@media (max-width: 768px) {
  .title {
    font-size: 40px;
  }
}
</style>
