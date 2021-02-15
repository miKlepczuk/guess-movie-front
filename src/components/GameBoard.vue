<template>
  <div>
    <h1 class="game-title">Zgadnij co to</h1>

    <div class="score-box">
      <h2>Score: {{ userScore }}</h2>
    </div>

    <div class="puzzle-indicator">
      <h3>
        <span>{{ puzzleId + 1 }}</span>
        /
        <span>{{ puzzlesQuantity }}</span>
      </h3>
    </div>

    <div class="puzzle-picture">
      <img :src="puzzleImage" />
    </div>

    <div class="gaps-box">_ _ _ _ _ _ &nbsp; &nbsp; _ _ _ _ _</div>

    <div class="letter-box">{{ puzzleSentence }}</div>

    
  </div>
</template>

<script>
import puzzles from "../assets/puzzles.json";
import { mapState } from "vuex";

export default {
  name: "GameBoard",
  data() {
    return {
      puzzlesQuantity: 30,
    };
  },
  computed: {
    ...mapState(["userScore"]),
    ...mapState(["currentPuzzleId"]),

    puzzles() {
      return puzzles.puzzles.map((item) => {
        return item;
      });
    },
    puzzleId() {
      return this.$store.state.currentPuzzleId;
    },

    puzzleImage() {
      return this.puzzles[this.puzzleId].image;
    },

    puzzleSentence() {
      return this.puzzles[this.puzzleId].sentence;
    },
  },
};
</script>


<style scoped>
</style>
