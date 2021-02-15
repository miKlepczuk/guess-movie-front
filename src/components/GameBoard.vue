<template>
  <div class="game-board">
    <h1 class="game-title">Zgadnij co to</h1>
    <ScoreBox />
    <PuzzleIndicator />
    <PuzzlePicture />
    <PuzzleSentenceBox />
  </div>
</template>

<script>
import PuzzleIndicator from "@/components/PuzzleIndicator.vue";
import ScoreBox from "@/components/ScoreBox.vue";
import PuzzlePicture from "@/components/PuzzlePicture.vue";
import PuzzleSentenceBox from "@/components/PuzzleSentenceBox.vue";

export default {
  name: "GameBoard",
  components: { ScoreBox, PuzzleIndicator, PuzzlePicture, PuzzleSentenceBox },
  setup() {},
};
</script>

<style scoped>
</style>
