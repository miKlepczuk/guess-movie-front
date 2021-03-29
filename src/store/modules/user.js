import axios from 'axios'

export default {
    state: {
        user: {
            id: 0,
            score: 0,
            email: '',
            puzzleId: 0,
            isAuthorized: false,
            isPuzzleFinished: false,
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
        isGameFinished(state, getters) {
            if (getters.isThisTheLastPuzzle && state.user.isPuzzleFinished) {
                return true
            }
            return false
        },
        isPuzzleFinished(state) {
            return state.user.isPuzzleFinished;
        },
    },

    mutations: {
        setUser(state, user) {
            state.user.id = user.id;
            state.user.score = user.score;
            state.user.email = user.email;
            state.user.puzzleId = user.puzzleId;
            state.user.isAuthorized = true;
            state.user.isPuzzleFinished = (user.isPuzzleFinished == 1 ? true : false);
        },
        clearUserState(state) {
            state.user.score = 0;
            state.user.id = 0;
            state.user.email = '';
            state.user.puzzleId = 0;
            state.user.isAuthorized = false;
            state.user.isPuzzleFinished = true;
        },

        changeUserScore(state, newScore) {
            state.user.score = newScore
        },

        incrementUserPuzzleId(state) {
            state.user.puzzleId = state.user.puzzleId + 1
        },

        changeIsPuzzleFinished(state, newState) {
            state.user.isPuzzleFinished = newState
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

        async changeUserScore({ commit, getters }, newScore) {
            commit('changeUserScore', newScore);
            let form = { score: getters.userScore, isPuzzleFinished: getters.isPuzzleFinished };
            const params = new URLSearchParams(form).toString();
            await axios.patch("users/" + getters.userId + '?' + params, form,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    }
                })
        },

        async incrementPuzzleApi({ getters }) {
            let form = { puzzleId: getters.userPuzzleId, isPuzzleFinished: getters.isPuzzleFinished };
            const params = new URLSearchParams(form).toString();
            await axios.patch("users/" + getters.userId + '?' + params, form, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                }
            })
        },

        logOut({ commit }) {
            localStorage.removeItem("token");
            commit('clearGameState');
            commit('clearUserState');
            commit('clearPuzzlesState');
        },

        finishPuzzle({ commit }) {
            commit('changeIsPuzzleFinished', true);
        },

        startPuzzle({ commit }) {
            commit('changeIsPuzzleFinished', false);
        },

    },

}
