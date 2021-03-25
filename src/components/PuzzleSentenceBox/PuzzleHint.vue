<template>
  <div class="hint" :class="isHintAllowed() == false ? 'hint--disabled' : ''">
    <img
      class="hint__icon"
      src="../../assets/images/hint.svg"
      @click="giveHint()"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import constants from "../../constants.js";

export default {
  name: "PuzzleHint",

  data() {
    return {};
  },
  methods: {
    ...mapActions(["logIn"]),
    ...mapActions(["changeUserScore"]),

    isHintAllowed() {
      if (this.userScore < constants.POINTS_FOR_SINGLE_HINT) return false;
      else if (this.isAnswerCorrect == true) return false;
      else return true;
    },

    giveHint() {
      if (this.isHintAllowed() == true) {
        console.log("hint is allowed");
        try {
          let newScore = this.userScore - constants.POINTS_FOR_SINGLE_HINT;
          this.changeUserScore(newScore);
        } catch (error) {
          console.log(error.response.data.message);
        }
      } else {
        console.log("hint is not allowed");
      }
    },
  },
  created() {},
  computed: {
    ...mapGetters(["userScore"]),
    ...mapGetters(["isThisTheLastPuzzle"]),
    ...mapGetters(["isAnswerCorrect"]),
  },
  watch: {},
};
</script>

<style scoped>
.hint {
  cursor: pointer;
  display: inline-block;
  padding: 0 7px;
  margin-top: 50px;
}
.hint__icon {
  height: 40px;
  width: auto;
}
.hint--disabled {
  opacity: 0.5;
  cursor: auto;
}
</style>