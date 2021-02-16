<template>
  <div class="puzzle-sentence-box">
    <div class="puzzle-gaps">
      <span class="sentence-mask">{{ sentenceMask }}</span>
    </div>

    <div class="letters-box">
      <div v-for="(letter, index) in sentenceScratteredLetters" :key="index">
        <span class="letters-box__single-letter" :index="index">
          {{ letter }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PuzzleSentenceBox",

  data() {
    return {
      sentenceMask: "",
      sentenceLetters: [],
      sentenceScratteredLetters: [],
    };
  },
  methods: {
    createSentenceMask() {
      String.prototype.cleanup = function () {
        return this.toLowerCase().replace(/[a-zA-Z]/g, "_");
      };
      this.sentenceMask = this.$store.getters.currentPuzzleSentence.cleanup();
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
      }
    },
  },
  mounted() {
    this.createSentenceMask();
    this.sentenceLetters = this.convertSentenceAsSplitedArray(this.$store.getters.currentPuzzleSentence);
    this.scatterLetters(this.sentenceLetters);
  },
};
</script>

<style scoped>
.sentence-mask {
  margin-top: 50px;
  font-size: 50px;
  letter-spacing: 5px;
}
.letters-box {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}
.letters-box__single-letter {
  border: 1px solid black;
  width: 40px;
  height: 40px;
  margin: 0 5px;
  font-size: 30px;
  display: inline-block;
  line-height: 40px;
  text-transform: capitalize;
}
.letters-box__single-letter:hover {
  cursor: pointer;
}
</style>