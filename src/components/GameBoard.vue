<template>
  <div class="game-board">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-8">
          <ScoreBox />
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-8">
          <PuzzlePicture />
        </div>

        <div class="col-8">
          <PuzzleHint />
        </div>
        
        <div class="col-8">
          <SentenceMask />
        </div>

        <div class="col-8">
          <PuzzleScratteredLetters />
        </div>

        <div class="col-8">
          <GameSummary />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScoreBox from "@/components/GameBoard/ScoreBox.vue";
import PuzzlePicture from "@/components/GameBoard/PuzzlePicture.vue";
import PuzzleScratteredLetters from "@/components/GameBoard/ScratteredLetters.vue";
import SentenceMask from "@/components/GameBoard/SentenceMask.vue";
import GameSummary from "@/components/GameBoard/GameSummary.vue";
import PuzzleHint from "@/components/GameBoard/PuzzleHint.vue";

export default {
  name: "GameBoard",
  components: {
    ScoreBox,
    PuzzlePicture,
    PuzzleScratteredLetters,
    SentenceMask,
    GameSummary,
    PuzzleHint,
  },
  setup() {},
};
</script>

<style scoped>
</style>
