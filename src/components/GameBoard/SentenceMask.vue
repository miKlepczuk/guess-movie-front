<template>
  <div class="sentence-mask">
    <div v-for="(item, index) in mask" :key="index">
      <p
        class="sentence-mask__single-sign"
        :index="index"
        :class="{
          'sign-space': item.letter == ' ',
          'correct-letter': isCorrectLetter(item),
        }"
        :style="clicableCss(item)"
        @click="removeLetter(item)"
      >
        <span v-if="item.letter !== '_'"> {{ item.letter }} </span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import constants from "../../constants.js";

export default {
  name: "SentenceMask",

  data() {
    return {};
  },
  methods: {
    ...mapActions(["removeItemFromMask"]),
    ...mapActions(["changeUserScore"]),
    ...mapActions(["finishGame"]),

    removeLetter(itemMask) {
      if (this.isAnswerCorrect == false) {
        this.removeItemFromMask(itemMask);
      }
    },
    clicableCss(item) {
      let auto = "cursor: auto";
      if (this.isAnswerCorrect == true) return auto;
      if (item.letter == " ") return auto;
      if (item.letter == "_") return auto;
      if (item.isHinted == true) return auto;
      else return "cursor: pointer";
    },
    isCorrectLetter(item) {
      if (item.isHinted) return true;
      else if (this.isAnswerCorrect) return true;
      else return false;
    },
  },
  created() {},
  computed: {
    ...mapGetters(["mask"]),
    ...mapGetters({ isAnswerCorrect: "isAnswerCorrect" }),
    ...mapGetters(["userScore"]),
    ...mapGetters(["isThisTheLastPuzzle"]),
  },
  watch: {
    isAnswerCorrect: function (value) {
      if (value == true) {
        let newScore = this.userScore + constants.POINTS_FOR_CORRECT_ANSWER;
        this.changeUserScore(newScore);
        if (this.isThisTheLastPuzzle) this.finishGame();
      }
    },
  },
};
</script>

<style scoped>
.sentence-mask {
  font-size: 50px;
  letter-spacing: 5px;
  text-transform: capitalize;
  margin-bottom: 50px;
}
.sentence-mask {
  display: flex;
  align-items: center;
  justify-content: center;
}
.letters__single-letter {
  border: 1px solid black;
  width: 40px;
  height: 40px;
  margin: 0 5px;
  font-size: 30px;
  display: inline-block;
  line-height: 40px;
  text-transform: capitalize;
}
.letters__single-letter:hover {
  cursor: pointer;
}
.sentence-mask__single-sign {
  font-size: 35px;
  line-height: 35px;
  width: 35px;
  height: 35px;
  margin: 0 3px;
  text-align: center;
  border-bottom: 2px solid gray;
}
.sign-space {
  border-bottom: 2px solid transparent;
}
.correct-letter {
  color: #05bf4e;
  border-color: transparent;
}
</style>