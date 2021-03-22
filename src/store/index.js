import { createStore } from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate";

const POINTS_FOR_CORRECT_ANSWER = 10;
const POINTS_FOR_SINGLE_HINT = 5;

export default createStore({
  state: {
    user: {
      score: 0,
      email: '',
      puzzleId: 0,
      isAuthorized: false
    },
    puzzles: [{ id: '', sentence: '', image: '' }],
    puzzlesQuantity: 3,
  },

  getters: {
    isAuthorized(state) {
      return state.user.isAuthorized;
    },
    userEmail(state) {
      return state.user.email;
    },
    userScore(state) {
      return state.user.score;
    },
    puzzlesQuantity(state) {
      return state.puzzlesQuantity;
    },

    isThisTheLastSentence(state) {
      if (state.user.puzzleId - 1 == state.puzzlesQuantity) {
        return true;
      }
      return false;
    },
    isAllowedToLoadNextSentence(state) {
      if (state.user.puzzleId - 1 > state.puzzlesQuantity) {
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
    currentPuzzleImage(state) {
      return state.puzzles[state.user.puzzleId].image;
    },

    userPuzzleId(state) {
      return state.user.puzzleId;
    },

    currentPuzzleSentence(state) {
      return state.puzzles[state.user.puzzleId].sentence;
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
      state.user.puzzleId = user.puzzleId - 1;
      state.user.isAuthorized = true;
    },

    setPuzzles(state, puzzles) {
      state.puzzles = puzzles;
    },

    clearUser(state) {
      state.user.score = 0;
      state.user.email = '';
      state.user.puzzleId = 1;
      state.user.isAuthorized = false;
    },

  },
  actions: {
    async logIn({ commit }, user) {
      let response = await axios.get("login_check", { params: user });
      localStorage.setItem("token", response.data.user.token);
      commit('setUser', response.data.user);
    },
    async register({ commit }, form) {
      const params = new URLSearchParams(form).toString();
      let response = await axios.post("register?" + params, form);
      localStorage.setItem("token", response.data.user.token);
      commit('setUser', response.data.user);
    },
    async getPuzzles({ commit }) {
      let response = await axios.get("puzzles", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      commit('setPuzzles', response.data)
    },
    logOut({ commit }) {
      localStorage.removeItem("token");
      commit('clearUser');
    },

  },
  modules: {
  },
  plugins: [createPersistedState()],
})
