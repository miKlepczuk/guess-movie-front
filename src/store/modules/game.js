export default {
    state: {
        game: {
            mask: [{ position: 0, letter: '', isHinted: false, indexInScrattered: 0 }],
            scratteredLetters: [],
            isCorrectAnswer: false
        }
    },

    getters: {
        scratteredLetters(state) {
            return state.game.scratteredLetters
        },
        mask(state) {
            return state.game.mask
        },
        firstFreePositionInMask(state) {
            for (var i = 0; i < state.game.mask.length; i++) {
                if (state.game.mask[i].letter == '_')
                    return i;
            }
            return -1;
        },

        isAnswerCorrect(state, getters) {
            if (getters.firstFreePositionInMask < 0) {
                let sentenceLetters = getters.currentPuzzleSentenceAsArray
                for (var i = 0; i < state.game.mask.length; i++) {
                    if (state.game.mask[i].letter !== sentenceLetters[i])
                        return false;
                }
                return true;
            }
            return false;
        },
        isMaskCompleted(state) {
            for (var i = 0; i < state.game.mask.length; i++) {
                if (state.game.mask[i].letter == "_") {
                    return false;
                }
            }
            return true;
        }
    },

    mutations: {
        setScratteredLetters(state, sentence) {
            state.game.scratteredLetters = sentence


        },
        setMask(state, mask) {
            state.game.mask = mask
        },
        saveItemToMask(state, playload) {
            let position = playload.position;
            let item = playload.itemScrattered;
            if (position >= 0) {
                let old = state.game.mask;
                state.game.mask = {}
                state.game.mask = old
                state.game.mask[position].letter = item.letter
                state.game.mask[position].indexInScrattered = item.position
                state.game.mask[position].isHinted = playload.isHinted
            }
        },
        hideItemInScrattered(state, item) {
            state.game.scratteredLetters[item.position].isVisible = false;
        },

        removeItemFromMask(state, itemMask) {
            state.game.mask[itemMask.position].letter = '_'
            state.game.mask[itemMask.position].indexInScrattered = null
        },
        showLetterInScrattered(state, itemMask) {
            state.game.scratteredLetters[itemMask.indexInScrattered].isVisible = true;
        },
        setCorrectAnswer(state, value) {
            state.game.isCorrectAnswer = value
        },
        clearGameState(state) {
            state.game.mask = []
            state.game.scratteredLetters = []
            state.game.isCorrectAnswer = false
        }
    },
    actions: {
        setScratteredLetters({ commit, getters }) {
            let isVisible = true;
            if (getters.isPuzzleFinished == true) {
                isVisible = false;
            }
            let sentenceLetters = getters.currentPuzzleSentence.toLowerCase().replace(/ /g, "").split("")
            var scratteredLetters = [];
            var sentenceLength = sentenceLetters.length;
            var sentenceLengthTemp = sentenceLength;
            for (var i = 0; i < sentenceLength; i++) {
                var randomPosition = Math.floor(Math.random() * (sentenceLengthTemp - 1 + 1));
                scratteredLetters.push({ letter: sentenceLetters[randomPosition], position: i, isVisible: isVisible })
                var sentenceTemp = sentenceLetters.join("");
                sentenceTemp = (sentenceTemp.slice(0, randomPosition) + sentenceTemp.slice(randomPosition + 1)).split("")
                sentenceLetters = sentenceTemp
                sentenceLengthTemp = sentenceLetters.length;
            }
            commit('setScratteredLetters', scratteredLetters);
        },

        setMask({ commit, getters }) {
            let mask = [];
            let maskLetters = []
            var isHinted = false;
            if (getters.isPuzzleFinished == true) {
                maskLetters = getters.currentPuzzleSentenceAsArray
                isHinted = true;
            } else {
                maskLetters = getters.currentPuzzleSentence.toLowerCase().replace(/[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]/g, "_").split("")
                isHinted = false;
            }
            for (var i = 0; i < maskLetters.length; i++) {
                mask.push({ letter: maskLetters[i], position: i, isHinted: isHinted, indexInScrattered: null })
            }
            commit('setMask', mask);
        },

        assignItemToMask({ commit }, playload) {
            commit('saveItemToMask', playload);
            commit('hideItemInScrattered', playload.itemScrattered);
        },

        removeItemFromMask({ commit }, itemMask) {
            var letter = itemMask.letter;
            if (letter !== " " && letter !== "_" && itemMask.isHinted == false) {
                commit('showLetterInScrattered', itemMask);
                commit('removeItemFromMask', itemMask);
            }
        },
    },

}
