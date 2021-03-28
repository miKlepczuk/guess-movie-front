import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import userModule from "./modules/user";
import puzzlesModule from "./modules/puzzles";
import gameModule from "./modules/game";


export default createStore({
  state: {
  },

  getters: {
  },

  mutations: {
  },

  actions: {
  },

  modules: {
    user: userModule,
    puzzles: puzzlesModule,
    game: gameModule
  },

  plugins: [createPersistedState()],
})
