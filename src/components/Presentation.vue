<template>
  <div class="presentation">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <h1 class="title">Guess what</h1>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <p class="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
            blandit libero, non egestas risus. Nam interdum mattis augue, non
            sodales nisl.
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
  margin-bottom: 30px;
}

.description {
  margin-bottom: 30px;
}
img {
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  .title {
    font-size: 40px;
  }
}
</style>
