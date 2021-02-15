import { createStore } from 'vuex'
import puzzles from "../assets/puzzles.json";

export default createStore({
  state: {
    userScore: 200,
    puzzlesQuantity: 30,
    currentPuzzleId: 0,
    puzzles: puzzles

  },
  getters: {
    userScore(state) {
      return state.userScore;
    },
    puzzlesQuantity(state) {
      return state.puzzlesQuantity;
    },

    currentPuzzleId(state) {
      return state.currentPuzzleId;
    },
    currentPuzzleImage(state) {
      return state.puzzles[state.currentPuzzleId].image;
    },
    currentPuzzleSentence(state) {
      return state.puzzles[state.currentPuzzleId].sentence;
    },
  },

  mutations: {
    increment: state => state.currentPuzzleId++,
  },
  actions: {
  },
  modules: {
  }
})
