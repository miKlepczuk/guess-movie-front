import { createStore } from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate";
import userModule from "./modules/user";
import constants from './modules/consts.js'

export default createStore({
  state: {
    puzzles: [],
    // mask: [{position: 0, letter: 'g', isHinted: false, indexInScrattered: 0}],
    // scratteredLetters: [{position: 0, letter: 'g', isVisible: false}]
  },

  getters: {
    puzzlesQuantity(state) {
      return state.puzzles.length;
    },

    isThisTheLastSentence(state, getters) {
      if (getters.userPuzzleId == getters.puzzlesQuantity) {
        return true;
      }
      return false;
    },
    isAllowedToLoadNextSentence(state, getters) {
      if (getters.userPuzzleId > getters.puzzlesQuantity) {
        return false;
      }
      return true;
    },
    isHintAllowed(state, getters) {
      if (getters.userScore >= constants.POINTS_FOR_SINGLE_HINT)
        return true;
      else
        return false;
    },
    currentPuzzleImage(state, getters) {
      let puzzle = state.puzzles.find(element => element.id == getters.userPuzzleId)
      if (puzzle)
        return puzzle.image;
    },

    currentPuzzleSentence(state, getters) {
      let puzzle = state.puzzles.find(element => element.id == getters.userPuzzleId)
      if (puzzle)
        return puzzle.sentence;
    },

  },

  mutations: {
    setPuzzles(state, puzzles) {
      state.puzzles = puzzles;
    },

    clearPuzzlesState(state) {
      state.puzzles = [];
    },
  },
  actions: {
    async getPuzzles({ commit }) {
      let response = await axios.get("puzzles", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      commit('setPuzzles', response.data)
    },

    incrementCurrentPuzzle({ commit, getters }) {
      if (getters.isThisTheLastSentence == false) {
        commit('incrementUserPuzzleId');
      }
    },

  },
  modules: {
    user: userModule
  },
  plugins: [createPersistedState()],
})
