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
    ...mapActions(["assignHintedLetterToMask"]),
    ...mapActions(["removeItemFromMask"]),

    isHintAllowed() {
      if (this.userScore < constants.POINTS_FOR_SINGLE_HINT) return false;
      else if (this.isAnswerCorrect == true) return false;
      else return true;
    },

    randomPositionForHintInMask() {
      return this.firstFreePositionInMask;
    },

    findItemInScratteredByLetter(letter) {
      let item = this.scratteredLetters.find(
        (element) => element.letter == letter && element.isVisible == true
      );
      if (item) return item;
      else return null;
    },

    findIncorrectItemInMaskByLetter(letter) {
      let item = this.mask.find(
        (element) =>
          element.letter == letter &&
          element.letter != this.sentenceSplitted[element.position]
      );
      if (item) return item;
      else return null;
    },

    assignLetterFromScrattedToMask(positionInMask) {
      let letterInMask = this.sentenceSplitted[positionInMask];
      console.log("letterInMask: ");
      console.log(letterInMask);

      // at first find suitable itemScratterd for random letter in Mask
      let itemInScrattered = this.findItemInScratteredByLetter(letterInMask);
      console.log("itemInScrattered: ");
      console.log(itemInScrattered);

      if (itemInScrattered == null) {
        console.log(
          "There is lack of available item to choose in scattered. User has made a mistake. He has chosen incorrect letter " +
            letterInMask
        );

        let incorrectItemInMask = this.findIncorrectItemInMaskByLetter(
          letterInMask
        );
        console.log("incorrectItemInMask");
        console.log(incorrectItemInMask);

        this.removeItemFromMask(incorrectItemInMask);

        return false;
      } else {
        let playload = {
          position: positionInMask,
          itemScrattered: itemInScrattered,
        };
        this.assignHintedLetterToMask(playload);
        return true;
      }
    },

    giveHint() {
      if (this.isHintAllowed() == true) {
        console.log("Hint is allowed.");
        try {
          let newScore = this.userScore - constants.POINTS_FOR_SINGLE_HINT;
          this.changeUserScore(newScore);

          let positionInMask = this.randomPositionForHintInMask();
          console.log("positionInMask: ");
          console.log(positionInMask);

          let isAssigned = this.assignLetterFromScrattedToMask(positionInMask);
          if (isAssigned == false)
            this.assignLetterFromScrattedToMask(positionInMask);
        } catch (error) {
          console.log("Error occurred.");
        }
      } else {
        console.log("Hint is not allowed.");
      }
    },
  },
  created() {},
  computed: {
    ...mapGetters(["userScore"]),
    ...mapGetters(["isThisTheLastPuzzle"]),
    ...mapGetters(["isAnswerCorrect"]),
    ...mapGetters(["firstFreePositionInMask"]),
    ...mapGetters(["scratteredLetters"]),
    ...mapGetters(["mask"]),
    ...mapGetters(["currentPuzzleSentence"]),
    ...mapGetters({ sentenceSplitted: "currentPuzzleSentenceAsArray" }),
    ...mapGetters(["isMaskCompleted"]),
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