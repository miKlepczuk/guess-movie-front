import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import userModule from "./modules/user";
import puzzlesModule from "./modules/puzzles";


export default createStore({
  state: {
    mask: [{ position: 0, letter: '', isHinted: false, indexInScrattered: 0 }],
    scratteredLetters: []
  },

  getters: {
    scratteredLetters(state) {
      return state.scratteredLetters
    },
    mask(state) {
      return state.mask
    },
    firstFreePositionInMask(state) {
      for (var i = 0; i < state.mask.length; i++) {
        if (state.mask[i].letter == '_')
          return i;
      }
      return -1;
    }
  },

  mutations: {
    setScratteredLetters(state, sentence) {
      state.scratteredLetters = sentence
    },
    setMask(state, mask) {
      state.mask = mask
    },
    saveItemToMask(state, playload) {
      let position = playload.position;
      let item = playload.item;
      if (position >= 0) {
        state.mask[position].letter = item.letter
        state.mask[position].indexInScrattered = item.position
      }
    },
    hideLetterInScratteted(state, position) {
      state.scratteredLetters[position].isVisible = false;
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

    setMask({ commit, getters }) {
      let maskLetters = getters.currentPuzzleSentence.toLowerCase().replace(/[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]/g, "_").split("")
      let mask = [];
      for (var i = 0; i < maskLetters.length; i++) {
        mask.push({ letter: maskLetters[i], position: i, isHinted: false, indexInScrattered: null })
      }
      commit('setMask', mask);
    },

    chooseLetterToMask({ commit, getters }, item) {
      let playload = {
        position: getters.firstFreePositionInMask,
        item: item
      }
      commit('saveItemToMask', playload);
      commit('hideLetterInScratteted', item.position);
    }

  },

  modules: {
    user: userModule,
    puzzles: puzzlesModule
  },

  plugins: [createPersistedState()],
})
