import axios from 'axios'
import constants from './consts.js'


export default {
    state: {
        user: {
            id: 0,
            score: 0,
            email: '',
            puzzleId: 0,
            isAuthorized: false
        },
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
        userPuzzleId(state) {
            return state.user.puzzleId;
        },
    },

    mutations: {
        setUser(state, user) {
            state.user.id = user.id;
            state.user.score = user.score;
            state.user.email = user.email;
            state.user.puzzleId = user.puzzleId;
            state.user.isAuthorized = true;
        },
        clearUserState(state) {
            state.user.score = 0;
            state.user.id = 0;
            state.user.email = '';
            state.user.puzzleId = 0;
            state.user.isAuthorized = false;
        },
        addPointsForCorrectAnswer(state, points) {
            state.user.score = state.user.score + points
        },

        substractPointsForHint(state, points) {
            state.user.score = state.user.score - points
        },
        incrementUserPuzzleId(state) {
            state.user.puzzleId = state.user.puzzleId + 1
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

        async substractPointsForHint({ commit, getters }) {
            commit('substractPointsForHint', constants.POINTS_FOR_SINGLE_HINT);
            let form = { score: getters.userScore };
            const params = new URLSearchParams(form).toString();
            await axios.patch("users/" + getters.userId + '?' + params, form,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    }
                })
        },

        async addPointsForCorrectAnswer({ commit, getters }) {
            commit('addPointsForCorrectAnswer', constants.POINTS_FOR_CORRECT_ANSWER)
            let form = { score: getters.userScore };
            const params = new URLSearchParams(form).toString();
            await axios.patch("users/" + getters.userId + '?' + params, form, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                }
            }
                  ,)
        },

        async incrementPuzzle({ dispatch, getters }) {
            dispatch('incrementCurrentPuzzle')
            let form = { puzzleId: getters.userPuzzleId };
            const params = new URLSearchParams(form).toString();
            await axios.patch("users/" + getters.userId + '?' + params, form, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                }
            })
        },

        logOut({ commit }) {
            localStorage.removeItem("token");
            commit('clearUserState');
            commit('clearPuzzlesState');
        },
    },

}
