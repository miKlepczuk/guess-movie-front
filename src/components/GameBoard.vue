<template>
  <div class="game-board">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <ScoreBox />
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-6">
          <PuzzlePicture />
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <PuzzleSentenceBox />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScoreBox from "@/components/ScoreBox.vue";
import PuzzlePicture from "@/components/PuzzlePicture.vue";
import PuzzleSentenceBox from "@/components/PuzzleSentenceBox.vue";

export default {
  name: "GameBoard",
  components: { ScoreBox, PuzzlePicture, PuzzleSentenceBox },
  setup() {},
};
</script>

<style scoped>
</style>
