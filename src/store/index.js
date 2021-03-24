import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import userModule from "./modules/user";
import puzzlesModule from "./modules/puzzles";


export default createStore({
  state: {
    mask: [{ position: 0, letter: 'g', isHinted: false, indexInScrattered: 0 }],
    scratteredLetters: []
  },

  getters: {
    scratteredLetters(state) {
      return state.scratteredLetters
    },
    mask(state) {
      return state.mask
    }
  },

  mutations: {
    setScratteredLetters(state, sentence) {
      state.scratteredLetters = sentence
    },
    setMask(state, mask) {
      state.mask = mask
    },
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

    setMask({ commit, getters }) {
      let maskLetters = getters.currentPuzzleSentence.toLowerCase().replace(/[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]/g, "_").split("")
      let mask = [];
      console.log(mask)
      for (var i = 0; i < maskLetters.length; i++) {
        mask.push({ letter: maskLetters[i], position: i, isHinted: false, indexInScrattered: null })
      }
      commit('setMask', mask);
    },

  },

  modules: {
    user: userModule,
    puzzles: puzzlesModule
  },

  plugins: [createPersistedState()],
})
