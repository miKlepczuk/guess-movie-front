import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import userModule from "./modules/user";
import puzzlesModule from "./modules/puzzles";

export default createStore({
  state: {
    // mask: [{position: 0, letter: 'g', isHinted: false, indexInScrattered: 0}],
    // scratteredLetters: [{position: 0, letter: 'g', isVisible: false}]
  },

  getters: {

  },

  mutations: {

  },

  actions: {

  },

  modules: {
    user: userModule,
    puzzles: puzzlesModule
  },

  plugins: [createPersistedState()],
})
