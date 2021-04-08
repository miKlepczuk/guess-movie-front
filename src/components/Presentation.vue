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
            on video frame and a board with letters in random order to fill placeholders.
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
            :to="{ name: 'login' }"
            class="btn btn-primary btn-lg btn-play"
          >
            Let's play the game!
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Presentation",

  methods: {},
  created() {},
  computed: {},
  watch: {},
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
