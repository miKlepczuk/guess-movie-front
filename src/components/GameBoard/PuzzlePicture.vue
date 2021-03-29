<template>
  <div class="puzzle-picture border">
    <PuzzleIndicator />
    <img :src="currentPuzzleImage" class="img-fluid" />
  </div>
</template>

<script>
import PuzzleIndicator from "@/components/GameBoard/PuzzleIndicator.vue";
import { mapGetters } from "vuex";

export default {
  name: "PuzzlePicture",
  components: { PuzzleIndicator },
  data() {},

  computed: {
    ...mapGetters(["currentPuzzleImage"]),
  },
};
</script>


<style scoped>
.puzzle-picture {
  margin-bottom: 25px;
  background: whitesmoke;
  padding: 20px 50px 50px;
  display: inline-block;
}
img{
  height: 30vh
}
@media (max-width: 768px) {
  .puzzle-picture {
    padding: 15px;
  }
  img{height: 20vh;}
}
</style>

 