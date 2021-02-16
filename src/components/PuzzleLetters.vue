<template>
  <div class="letters-box">
    <div v-for="(letter, index) in sentenceScratteredLetters" :key="index">
      <span class="letters-box__single-letter" :index="index" >{{
        letter
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PuzzleLetters",
  props: {
    sentence: String,
  },

  data() {
    return {
      sentenceLetters: [],
      sentenceScratteredLetters: [],
    };
  },
  methods: {
    convertSentenceAsSplitedArray() {
      var sentenceLowerCase = this.sentence.toLowerCase();
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
    this.sentenceLetters = this.convertSentenceAsSplitedArray();
    this.scatterLetters(this.sentenceLetters);
  },
};
</script>

<style scoped>
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