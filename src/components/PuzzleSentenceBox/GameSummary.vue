<template>
  <div classs="summary">
    <!-- <div v-if="isEndOfGame" class="end-game-information">
      Congratulations! <br>This is end of the game!

    </div>
    <div v-else> -->
    <div
      v-show="isAnswerCorrect"
      class="btn btn-primary btn-lg"
      @click="goToNextSentence()"
    >
      Next
      <!-- </div> -->
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
  },
  watch: {},
};
</script>