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
  margin-bottom: 50px;
  background: whitesmoke;
  padding: 20px 50px 50px;
}
</style>

 