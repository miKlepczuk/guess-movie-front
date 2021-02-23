import { createStore } from 'vuex'
import puzzles from "../assets/puzzles.json";

const POINTS_FOR_CORRECT_ANSWER = 10;
const POINTS_FOR_SINGLE_HINT = 5;

export default createStore({
  state: {
    userScore: 20,
    currentPuzzleId: 0,
    puzzles: puzzles,
    puzzlesQuantity: puzzles.length,
  },
  getters: {
    userScore(state) {
      return state.userScore;
    },
    puzzlesQuantity(state) {
      return state.puzzles.length;
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
    isThisTheLastSentence(state) {
      if (state.currentPuzzleId + 1 == state.puzzlesQuantity) {
        return true;
      }
      return false;
    },
    isAllowedToLoadNextSentence(state) {
      if (state.currentPuzzleId + 1 > state.puzzlesQuantity) {
        return false;
      }
      return true;
    },
    isHintAllowed(state) {
      if (state.userScore >= POINTS_FOR_SINGLE_HINT)
        return true;
      else
        return false;
    }
  },

  mutations: {
    incrementCurrentSentenceId(state) {
      if (this.getters.isThisTheLastSentence == false) {
        state.currentPuzzleId++
      }

    },
    addPointsForCorrectAnswer: state => state.userScore = state.userScore + POINTS_FOR_CORRECT_ANSWER,
    substractPointsForHint: state => state.userScore = state.userScore - POINTS_FOR_SINGLE_HINT,

  },
  actions: {
  },
  modules: {
  }
})
