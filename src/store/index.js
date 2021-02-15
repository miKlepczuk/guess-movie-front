import { createStore } from 'vuex'

export default createStore({
  state: {
    currentPuzzleId: 0,
    userScore: 200,
  },
  getters: {
    userScore(state) {
      return state.userScore;
    },
    currentPuzzleId(state) {
      return state.currentPuzzleId;
    },
  },
  mutations: {
    increment: state => state.currentPuzzleId++,
  },
  actions: {
  },
  modules: {
  }
})
