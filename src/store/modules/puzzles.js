import axios from 'axios'
import constants from '../../constants.js'


export default {
    state: {
        puzzles: [],
    },

    getters: {
        puzzlesQuantity(state) {
            if (state.puzzles)
                return state.puzzles.length;
            else
                return 0;
        },
        isThisTheLastPuzzle(state, getters) {
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
        currentPuzzleSentenceAsArray(state, getters) {
            let sentence = getters.currentPuzzleSentence;
            if (sentence)
                return sentence.toLowerCase().split("");
        }
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
        async getPuzzles({ commit, dispatch }) {

            let response = await axios.get("puzzles", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            commit('setPuzzles', response.data)
            dispatch('setScratteredLetters');
            dispatch('setMask');

        },

        incrementCurrentPuzzle({ commit, dispatch, getters }) {
            if (getters.isThisTheLastPuzzle == false) {
                commit('incrementUserPuzzleId');
                dispatch('startPuzzle');
                dispatch('setScratteredLetters');
                dispatch('setMask');
                dispatch('incrementPuzzleApi');
            }
        },


    },

}
