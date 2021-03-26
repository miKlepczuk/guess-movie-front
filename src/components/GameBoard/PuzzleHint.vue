<template>
  <div class="hint d-flex justify-content-end" :class="isHintAllowed() == false ? 'hint--disabled' : ''">
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
    ...mapActions(["assignItemToMask"]),
    ...mapActions(["removeItemFromMask"]),

    giveHint() {
      if (this.isHintAllowed() == true) {
        try {
          let newScore = this.userScore - constants.POINTS_FOR_SINGLE_HINT;
          this.changeUserScore(newScore);
          let positionInMask = this.randomPositionForHintInMask();
          this.removeWrongItemsInMaskIfExists(positionInMask);
          this.assignItemFromScratteredToMask(positionInMask);
        } catch (error) {
          console.log("Error occurred.");
        }
      }
    },

    isHintAllowed() {
      if (this.userScore < constants.POINTS_FOR_SINGLE_HINT) return false;
      else if (this.isAnswerCorrect == true) return false;
      else return true;
    },

    randomPositionForHintInMask() {
      let position = this.randomizeToNumber(this.mask.length);
      let itemMask = this.findItemByPosition(this.mask, position);
      if (this.isMaskCompleted == false) {
        if (itemMask.letter == " ") return this.randomPositionForHintInMask();
        if (itemMask.letter !== "_") return this.randomPositionForHintInMask();
      } else if (this.isMaskCompleted == true) {
        let isCorrectItem = this.isCorrectItemInMaskByPosition(position);
        if (isCorrectItem == true) return this.randomPositionForHintInMask();
      }

      return position;
    },

    randomizeToNumber(number) {
      return Math.floor(Math.random() * (number - 1 + 1));
    },

    findItemByPosition(collection, position) {
      let item = collection.find((element) => element.position == position);
      if (item) return item;
      else return null;
    },

    isCorrectItemInMaskByPosition(position) {
      let item = this.mask.find(
        (element) =>
          element.position == position &&
          element.letter == this.sentenceSplitted[element.position]
      );
      if (item) return true;
      else return false;
    },

    removeWrongItemsInMaskIfExists(position) {
      // checking correctness randomized position
      let wrongItemOnRandomizedPosition = this.getWrongItemInMaskByPosition(
        position
      );
      if (wrongItemOnRandomizedPosition)
        this.removeItemFromMask(wrongItemOnRandomizedPosition);

      // looking for mistake in previous user assignment for letter on randomized position
      let correctLetter = this.sentenceSplitted[position];
      let wrongChoosenItemInMask = this.getFirstWrongChoosenItemInMaskByLetter(
        correctLetter
      );
      if (wrongChoosenItemInMask)
        this.removeItemFromMask(wrongChoosenItemInMask);
    },

    assignItemFromScratteredToMask(positionInMask) {
      let correctLetterInMask = this.sentenceSplitted[positionInMask];
      let item = this.findItemInScratteredByLetter(correctLetterInMask);
      let playload = {
        position: positionInMask,
        itemScrattered: item,
        isHinted: true,
      };
      this.assignItemToMask(playload);
    },

    findItemInScratteredByLetter(letter) {
      let item = this.scratteredLetters.find(
        (element) => element.letter == letter && element.isVisible == true
      );
      if (item) return item;
      else return null;
    },

    getWrongItemInMaskByPosition(position) {
      let isCorrectItem = this.isCorrectItemInMaskByPosition(position);
      if (isCorrectItem == false) {
        return this.findItemByPosition(this.mask, position);
      }
      return null;
    },

    getFirstWrongChoosenItemInMaskByLetter(letter) {
      let isAvailableInScrattered = this.isAvailableLetterInScrattered(letter);
      if (isAvailableInScrattered == false) {
        let wrongItem = this.findIncorrectItemInMaskByLetter(letter);
        return wrongItem;
      }
      return null;
    },

    isAvailableLetterInScrattered(letter) {
      let item = this.scratteredLetters.find(
        (element) => element.letter == letter && element.isVisible == true
      );
      if (item) return true;
      else return false;
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
  margin-bottom: 15px;
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