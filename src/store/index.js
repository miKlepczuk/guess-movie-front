import { createStore } from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate";

const POINTS_FOR_CORRECT_ANSWER = 10;
const POINTS_FOR_SINGLE_HINT = 5;

export default createStore({
  state: {
    user: {
      id: 0,
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
    userId(state) {
      return state.user.id;
    },
    userScore(state) {
      return state.user.score;
    },
    puzzlesQuantity(state) {
      return state.puzzlesQuantity;
    },

    isThisTheLastSentence(state) {
      if (state.user.puzzleId == state.puzzlesQuantity) {
        return true;
      }
      return false;
    },
    isAllowedToLoadNextSentence(state) {
      if (state.user.puzzleId > state.puzzlesQuantity) {
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
      let puzzle = state.puzzles.find(element => element.id = state.user.puzzleId)
      return puzzle.image;
    },

    userPuzzleId(state) {
      return state.user.puzzleId;
    },

    currentPuzzleSentence(state) {
      let puzzle = state.puzzles.find(element => element.id = state.user.puzzleId)
      return puzzle.sentence;
    },
  },

  mutations: {
    incrementCurrentPuzzle(state) {
      if (this.getters.isThisTheLastSentence == false) {
        state.user.puzzleId = state.user.puzzleId + 1
      }
    },
    addPointsForCorrectAnswer: state => state.user.score = state.user.score + POINTS_FOR_CORRECT_ANSWER,
    substractPointsForHint: state => state.user.score = state.user.score - POINTS_FOR_SINGLE_HINT,

    setUser(state, user) {
      state.user.id = user.id;
      state.user.score = user.score;
      state.user.email = user.email;
      state.user.puzzleId = user.puzzleId;
      state.user.isAuthorized = true;
    },

    setPuzzles(state, puzzles) {
      state.puzzles = puzzles;
    },

    clearState(state) {
      state.user.score = 0;
      state.user.id = 0;
      state.user.email = '';
      state.user.puzzleId = 0;
      state.user.isAuthorized = false;
      state.puzzles = [{ id: '', sentence: '', image: '' }];
      state.puzzlesQuantity = 3;
    }
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
      commit('clearState');
    },

    async substractPointsForHint({ commit, getters }) {
      commit('substractPointsForHint');
      let form = { score: getters.userScore };
      const params = new URLSearchParams(form).toString();
      let response = await axios.patch("users/" + getters.userId + '?' + params, form)
    },

    },

  },
  modules: {
  },
  plugins: [createPersistedState()],
})
