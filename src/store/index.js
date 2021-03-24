import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import userModule from "./modules/user";
import puzzlesModule from "./modules/puzzles";


export default createStore({
  state: {
    // mask: [{position: 0, letter: 'g', isHinted: false, indexInScrattered: 0}],
    scratteredLetters: []
  },

  getters: {
    scratteredLetters(state) {
      return state.scratteredLetters
    }
  },

  mutations: {
    setScratteredLetters(state, sentence) {
      state.scratteredLetters = sentence
    }
  },

  actions: {
    setScratteredLetters({ commit, getters }) {
      let sentenceLetters = getters.currentPuzzleSentence.toLowerCase().replace(/ /g, "").split("")
      var scratteredLetters = [];
      var sentenceLength = sentenceLetters.length;
      var sentenceLengthTemp = sentenceLength;
      for (var i = 0; i < sentenceLength; i++) {
        var randomPosition = Math.floor(Math.random() * (sentenceLengthTemp - 1 + 1));
        scratteredLetters.push({ letter: sentenceLetters[randomPosition], position: i, isVisible: true })
        var sentenceTemp = sentenceLetters.join("");
        sentenceTemp = (sentenceTemp.slice(0, randomPosition) + sentenceTemp.slice(randomPosition + 1)).split("")
        sentenceLetters = sentenceTemp
        sentenceLengthTemp = sentenceLetters.length;
      }
      commit('setScratteredLetters', scratteredLetters);
    },

  },

  modules: {
    user: userModule,
    puzzles: puzzlesModule
  },

  plugins: [createPersistedState()],
})
