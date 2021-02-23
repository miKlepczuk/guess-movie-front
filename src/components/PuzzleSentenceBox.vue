<template>
  <div class="puzzle-sentence-box">
    <div class="sentence-mask">
      <div v-for="(letter, index) in sentenceMask" :key="index">
        <p
          class="sentence-mask__single-sign"
          :index="index"
          :class="{
            'sign-space': letter == ' ',
            'hinted-letter': hintedPositions.includes(index),
          }"
          :style="
            isCorrectAnswer == false &&
            letter !== ' ' &&
            letter !== '_' &&
            !hintedPositions.includes(index)
              ? 'cursor: pointer'
              : 'cursor: auto'
          "
          @click="removeLetterFromMask(index)"
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
          @click="chooseLetterToMask(index)"
        >
          {{ letter }}
        </span>
      </div>
    </div>
    <div class="hint" v-show="!isCorrectAnswer">
      <img class="hint__icon" src="../assets/hint.svg" @click="giveHint()" />
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
      hintedPositions: [],
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
      return sentenceLowerCase.split("");
    },

    removeLetterByIndex(string, index) {
      string = string.join("");
      return (string.slice(0, index) + string.slice(index + 1)).split("");
    },

    randomizeToNumber(maxNumber) {
      return Math.floor(Math.random() * (maxNumber - 1 + 1));
    },
    removeSpacesFromArray(sentence) {
      return sentence.join("").replace(/ /g, "").split("");
    },

    scatterLetters(sentenceLetters) {
      var sentenceLength = sentenceLetters.length;
      var sentenceLengthTemp = sentenceLength;

      for (var i = 0; i < sentenceLength; i++) {
        var randomPosition = this.randomizeToNumber(sentenceLengthTemp);

        this.sentenceScratteredLetters[i] = sentenceLetters[randomPosition];
        sentenceLetters = this.removeLetterByIndex(
          sentenceLetters,
          randomPosition
        );
        sentenceLengthTemp = sentenceLetters.length;
        this.visibleLetters[i] = true;
      }

      this.sentenceScratteredLetters = this.removeSpacesFromArray(
        this.sentenceScratteredLetters
      );
    },

    chooseLetterToMask(index) {
      var firstFreePosition = this.sentenceMask.indexOf("_");
      if (firstFreePosition >= 0) {
        this.assignLetterToMask(index, firstFreePosition);
      }
    },

    assignLetterToMask(sourceIndex, destinationIndex) {
      this.sentenceMask[destinationIndex] = this.sentenceScratteredLetters[
        sourceIndex
      ];
      this.indexesOfScratteredLettersInMask[destinationIndex] = sourceIndex;
      this.visibleLetters[sourceIndex] = false;
    },
    removeLetterFromMask(index) {
      var letter = this.sentenceMask[index];
      if (
        this.isCorrectAnswer == false &&
        letter !== " " &&
        !this.hintedPositions.includes(index)
      ) {
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
        this.indexesOfScratteredLettersInMask = [];
        this.hintedPositions = [];
        this.createSentenceMask();
        this.sentenceLetters = this.convertSentenceAsSplitedArray(
          this.$store.getters.currentPuzzleSentence
        );
        this.scatterLetters(this.sentenceLetters);
      }
    },
    isMaskComplete() {
      for (var i = 0; i < this.sentenceMask.length; i++) {
        if (this.sentenceMask[i] == "_") {
          return false;
        }
      }
      return true;
    },
    randomLetterInSentenceToHint() {
      var sentenceLength = this.sentenceLetters.length;
      var randomPosition = null;
      var randomLetter = "";
      var isMaskComplete = this.isMaskComplete();

      // At first, we are randomize position for unfilled gaps in the sentence.
      if (isMaskComplete == false) {
        do {
          randomPosition = this.randomizeToNumber(sentenceLength);
          randomLetter = this.sentenceLetters[randomPosition];
          var letterInMask = this.sentenceMask[randomPosition];
        } while (
          this.hintedPositions.includes(randomPosition) == true ||
          randomLetter == " " ||
          letterInMask !== "_" ||
          isMaskComplete !== false
        );
      }
      // When all gaps in the sentence are filled, then we can randomize position among occupied positions in the sentence.
      if (randomPosition == null && isMaskComplete == true) {
        do {
          randomPosition = this.randomizeToNumber(sentenceLength);
          randomLetter = this.sentenceLetters[randomPosition];
        } while (
          this.hintedPositions.includes(randomPosition) == true ||
          randomLetter == " "
        );
      }
      return randomPosition;
    },
    getFirstOccurrenceInScrattered(letter) {
      for (
        var index = 0;
        index < this.sentenceScratteredLetters.length;
        index++
      ) {
        if (
          this.sentenceScratteredLetters[index] == letter &&
          this.indexesOfScratteredLettersInMask.includes(index) == false
        ) {
          return index;
        }
      }
      return null;
    },
    giveHint() {
      if (this.isCorrectAnswer == false) {
        var randomIndexLetter = this.randomLetterInSentenceToHint();
        var randomLetter = this.sentenceLetters[randomIndexLetter];

        var indexInScrattered = this.getFirstOccurrenceInScrattered(
          randomLetter
        );

        if (indexInScrattered == null) {
          indexInScrattered = this.getFirstOccurrenceInScrattered(randomLetter);
          // Randomize letter is used in another position.

          for (var i = 0; i <= this.sentenceMask.length; i++) {
            if (
              this.sentenceMask[i] == randomLetter &&
              this.hintedPositions.includes(i) == false
            ) {
              indexInScrattered = this.indexesOfScratteredLettersInMask[i];
              this.removeLetterFromMask(i);
              break;
            }
          }
        }

        if (this.sentenceMask[randomIndexLetter] !== "_") {
          // Position of randomize letter is occupied by another letter.
          this.removeLetterFromMask(randomIndexLetter);
        }

        this.assignLetterToMask(indexInScrattered, randomIndexLetter);
        this.hintedPositions.push(randomIndexLetter);
      } else {
        console.log("TODO: Hint is not active.");
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

.hint {
  cursor: pointer;
  display: inline-block;
  padding: 0 7px;
}
.hint__icon {
  height: 40px;
  width: auto;
}
.hinted-letter {
  color: green;
  border-color: transparent;
}
</style>