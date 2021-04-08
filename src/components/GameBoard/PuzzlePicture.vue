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
  margin-bottom: 45px;
  display: inline-block;
}
img {
  height: 30vh;
  min-height: 200px;
  border: 1px solid gray;
}

@media (max-width: 768px) {
  img {
    height: 25vh;
  }
  .puzzle-picture {
    margin-bottom: 30px;
  }
}

@media (max-width: 480px) {
  img {
    height: auto;
    min-height: auto;
    width: 100%;
  }
}
</style>

 