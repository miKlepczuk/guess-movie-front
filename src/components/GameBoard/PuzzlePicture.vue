<template>
  <div class="puzzle-picture">
    <img :src="currentPuzzleImage" class="img-fluid" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PuzzlePicture",
  data() {},

  computed: {
    ...mapGetters(["currentPuzzleImage"]),
  },
};
</script>

<style scoped>
.puzzle-picture {
  margin-bottom: 60px;
  display: inline-block;
}
img {
  height: 20vh;
}

@media (max-width: 768px) {
  img {
    height: 15vh;
  }
  .puzzle-picture {
    margin-bottom: 50px;
  }
}
</style>

 