<template>
  <div classs="summary">
    <template v-if="isGameFinished">
      <div class="end-game-information">
        <h1 class="title">Congratulations!</h1>
        <h3 class="subtitle">You've finished the game.</h3>
      </div>
    </template>

    <div
      v-else
      v-show="isAnswerCorrect || isPuzzleFinished"
      class="btn btn-primary btn-lg"
      @click="goToNextSentence()"
    >
      Next
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "GameSummary",

  data() {
    return {};
  },
  methods: {
    ...mapActions(["incrementCurrentPuzzle"]),
    goToNextSentence() {
      this.incrementCurrentPuzzle();
    },
  },
  created() {},
  computed: {
    ...mapGetters({ isAnswerCorrect: "isAnswerCorrect" }),
    ...mapGetters(["isGameFinished"]),
    ...mapGetters(["isPuzzleFinished"]),
  },
  watch: {},
};
</script>
<style scoped>
.end-game-information {
  text-align: center;
  font-weight: bold;
  margin-bottom: 15px;
  color: #05bf4e;
}

.title {
  font-family: "Londrina Solid", cursive;
  font-size: 2.5rem;
}
.subtitle {
  font-family: "Open Sans Condensed", sans-serif;
  font-size: 1.6rem;
}

@media (max-width: 768px) {
  .title {
    font-size: 1.8rem;
  }
  .subtitle {
    font-size: 1.4rem;
  }
}
</style>