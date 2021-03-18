import { createStore } from 'vuex'
import puzzles from "../assets/puzzles.json";
import axios from 'axios'

const POINTS_FOR_CORRECT_ANSWER = 10;
const POINTS_FOR_SINGLE_HINT = 5;

export default createStore({
  state: {
    user:{
      score: 0,
      email: '',
      puzzleId: 0
    },

    puzzles: puzzles,
    puzzlesQuantity: puzzles.length,


  },

  getters: {
    userScore(state) {
      return state.user.score;
    },
    puzzlesQuantity(state) {
      return state.puzzles.length;
    },

    userPuzzleId(state) {
      return state.user.puzzleId;
    },
    currentPuzzleImage(state) {
      return state.puzzles[state.user.puzzleId].image;
    },
    currentPuzzleSentence(state) {
      return state.puzzles[state.user.puzzleId].sentence;
    },
    isThisTheLastSentence(state) {
      if (state.user.puzzleId + 1 == state.puzzlesQuantity) {
        return true;
      }
      return false;
    },
    isAllowedToLoadNextSentence(state) {
      if (state.user.puzzleId + 1 > state.puzzlesQuantity) {
        return false;
      }
      return true;
    },
    isHintAllowed(state) {
      if (state.user.score >= POINTS_FOR_SINGLE_HINT)
        return true;
      else
        return false;
    },
  },

  mutations: {
    incrementCurrentSentenceId(state) {
      if (this.getters.isThisTheLastSentence == false) {
        state.user.puzzleId++
      }
    },
    addPointsForCorrectAnswer: state => state.user.score = state.user.score + POINTS_FOR_CORRECT_ANSWER,
    substractPointsForHint: state => state.user.score = state.user.score - POINTS_FOR_SINGLE_HINT,

    setUser(state, user) {
      state.user.score = user.score;
      state.user.email = user.email;
      state.user.puzzleId = user.puzzleId;
    },

  },
  actions: {
    async LogIn({ commit }, user) {
      let response = await axios.get("login_check", { params: user });
      localStorage.setItem("token", response.data.user.token);
      commit('setUser', response.data.user)
    },
  },
  modules: {
  }
})
