import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import userModule from "./modules/user";
import puzzlesModule from "./modules/puzzles";


export default createStore({
  state: {
    mask: [{ position: 0, letter: '', isHinted: false, indexInScrattered: 0 }],
    scratteredLetters: [],
    isCorrectAnswer: false
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
    },

    isAnswerCorrect(state, getters) {
      if (getters.firstFreePositionInMask < 0) {
        let sentenceLetters = getters.currentPuzzleSentenceAsArray
        for (var i = 0; i < state.mask.length; i++) {
          if (state.mask[i].letter !== sentenceLetters[i])
            return false;
        }
        return true;
      }
      return false;
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
      let item = playload.itemScrattered;
      if (position >= 0) {
        state.mask[position].letter = item.letter
        state.mask[position].indexInScrattered = item.position
      }
    },
    hideItemInScrattered(state, item) {
      state.scratteredLetters[item.position].isVisible = false;
    },

    removeItemFromMask(state, itemMask) {
      state.mask[itemMask.position].letter = '_'
      state.mask[itemMask.position].indexInScrattered = null
    },
    showLetterInScrattered(state, itemMask) {
      state.scratteredLetters[itemMask.indexInScrattered].isVisible = true;
    },
    setCorrectAnswer(state, value) {
      state.isCorrectAnswer = value
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

    chooseLetterToMask({ commit, getters }, itemScrattered) {
      let playload = {
        position: getters.firstFreePositionInMask,
        itemScrattered: itemScrattered
      }
      commit('saveItemToMask', playload);
      commit('hideItemInScrattered', itemScrattered);
    },

    removeItemFromMask({ commit }, itemMask) {
      var letter = itemMask.letter;
      if (letter !== " " && letter !== "_" && itemMask.isHinted == false) {
        commit('showLetterInScrattered', itemMask);
        commit('removeItemFromMask', itemMask);
      }
    },


  },

  modules: {
    user: userModule,
    puzzles: puzzlesModule
  },

  plugins: [createPersistedState()],
})
