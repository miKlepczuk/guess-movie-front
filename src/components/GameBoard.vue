<template>
  <div class="game-board">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12">
          <ScoreBox />
        </div>
        <div class="col-12">
          <PuzzleIndicator />
        </div>
        <div class="col-12">
          <PuzzlePicture />
        </div>

        <div class="col-12">
          <SentenceMask />
        </div>

        <div class="col-12">
          <PuzzleScratteredLetters />
        </div>

        <div class="col-12">
          <GameSummary />
        </div>

        <div class="col-12">
          <PuzzleHint />
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
import PuzzleIndicator from "@/components/GameBoard/PuzzleIndicator.vue";

import { mapGetters } from "vuex";

export default {
  name: "GameBoard",
  components: {
    ScoreBox,
    PuzzlePicture,
    PuzzleScratteredLetters,
    SentenceMask,
    GameSummary,
    PuzzleHint,
    PuzzleIndicator,
  },
  methods: {},
  created() {},
  computed: {
    ...mapGetters(["isGameFinished"]),
    ...mapGetters(["isAnswerCorrect"]),
  },
  watch: {},
};
</script>

<style scoped>
</style>
