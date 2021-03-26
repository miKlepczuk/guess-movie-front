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
          <SentenceMask />
        </div>

        <div class="col-8">
          <PuzzleScratteredLetters />
        </div>

        <div class="col-8">
          <PuzzleHint />
        </div>

        <div class="col-8">
          <GameSummary />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScoreBox from "@/components/ScoreBox.vue";
import PuzzlePicture from "@/components/PuzzlePicture.vue";
import PuzzleScratteredLetters from "@/components/PuzzleSentenceBox/ScratteredLetters.vue";
import SentenceMask from "@/components/PuzzleSentenceBox/SentenceMask.vue";
import GameSummary from "@/components/PuzzleSentenceBox/GameSummary.vue";
import PuzzleHint from "@/components/PuzzleSentenceBox/PuzzleHint.vue";

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
