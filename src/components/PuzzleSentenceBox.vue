<template>
  <div class="puzzle-sentence-box">
    <div class="sentence-mask">
      <div v-for="(letter, index) in sentenceMask" :key="index">
        <p
          class="sentence-mask__single-sign"
          :index="index"
          :class="letter == ' ' ? 'sign-space' : ''"
          :style="
            isCorrectAnswer == false && letter !== ' ' && letter !== '_'
              ? 'cursor: pointer'
              : 'cursor: auto'
          "
          @click="removeLetterFromMask(index, letter)"
        >
          <span v-if="letter !== '_'"> {{ letter }} </span>
        </p>
      </div>
    </div>

    <div class="letters">
      <div v-for="(letter, index) in sentenceScratteredLetters" :key="index">
        <span
          class="letters__single-letter"
          :index="index"
          v-show="visibleLetters[index]"
          @click="chooseLetterToMask(index, letter)"
        >
          {{ letter }}
        </span>
      </div>
    </div>
    <div v-if="isEndOfGame">Gratulacje! Koniec gry.</div>
    <div v-else>
      <button v-show="isCorrectAnswer" @click="goToNextSentence">
        Dalej>>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "PuzzleSentenceBox",

  data() {
    return {
      sentenceMask: [],
      indexesOfScratteredLettersInMask: [],
      visibleLetters: [],
      sentenceLetters: [],
      sentenceScratteredLetters: [],
    };
  },
  methods: {
    createSentenceMask() {
      String.prototype.cleanup = function () {
        return this.toLowerCase().replace(/[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]/g, "_");
      };
      this.sentenceMask = this.$store.getters.currentPuzzleSentence
        .cleanup()
        .split("");
    },

    convertSentenceAsSplitedArray(sentence) {
      var sentenceLowerCase = sentence.toLowerCase();
      var sentenceWithoutSpaces = sentenceLowerCase.replace(/ /g, "");
      return sentenceWithoutSpaces.split("");
    },

    removeLetterByIndex(string, index) {
      string = string.join("");
      return (string.slice(0, index) + string.slice(index + 1)).split("");
    },

    scatterLetters(splitedSentence) {
      var sentenceLength = splitedSentence.length;
      var sentenceLengthTemp = sentenceLength;

      for (var i = 0; i < sentenceLength; i++) {
        var randomPosition = Math.floor(
          Math.random() * (sentenceLengthTemp - 1 + 1)
        );
        this.sentenceScratteredLetters[i] = splitedSentence[randomPosition];
        splitedSentence = this.removeLetterByIndex(
          splitedSentence,
          randomPosition
        );
        sentenceLengthTemp = splitedSentence.length;
        this.visibleLetters[i] = true;
      }
    },

    chooseLetterToMask(index, letter) {
      var firstFreePosition = this.sentenceMask.indexOf("_");
      if (firstFreePosition >= 0) {
        this.sentenceMask[firstFreePosition] = letter;
        this.indexesOfScratteredLettersInMask[firstFreePosition] = index;
        this.visibleLetters[index] = false;
      }
    },

    removeLetterFromMask(index, letter) {
      if (this.isCorrectAnswer == false && letter !== " ") {
        this.sentenceMask[index] = "_";
        this.visibleLetters[
          this.indexesOfScratteredLettersInMask[index]
        ] = true;
        this.indexesOfScratteredLettersInMask[index] = null;
      }
    },
    addPointsForCorrectAnswer() {
      this.$store.commit("addPointsForCorrectAnswer");
    },
    goToNextSentence() {
      this.$store.commit("incrementCurrentSentenceId");
      this.prepareBoardForSentence();
    },
    prepareBoardForSentence() {
      if (this.$store.getters.isAllowedToLoadNextSentence == true) {
        this.createSentenceMask();
        this.sentenceLetters = this.convertSentenceAsSplitedArray(
          this.$store.getters.currentPuzzleSentence
        );
        this.scatterLetters(this.sentenceLetters);
      }
    },
  },
  mounted() {
    this.prepareBoardForSentence();
  },
  computed: {
    isCorrectAnswer() {
      if (
        this.sentenceMask.join("").toString() ==
        this.$store.getters.currentPuzzleSentence.toLowerCase()
      ) {
        this.addPointsForCorrectAnswer();
        return true;
      } else return false;
    },
    isEndOfGame() {
      if (
        this.isCorrectAnswer &&
        this.$store.getters.isThisTheLastSentence == true
      ) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped>
.sentence-mask {
  margin-top: 50px;
  font-size: 50px;
  letter-spacing: 5px;
  text-transform: capitalize;
}
.letters,
.sentence-mask {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
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
  width: 37px;
  height: 37px;
  margin: 0 5px;
  text-align: center;
  border-bottom: 2px solid gray;
}
.sign-space {
  border-bottom: 2px solid transparent;
}
</style>