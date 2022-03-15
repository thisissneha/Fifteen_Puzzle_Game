import Vuex from 'vuex';
import axios from 'axios';

export const store = new Vuex.Store({

    state: {

        numberID: {
            "row-cell-0": "",
            "row-cell-1": 1,
            "row-cell-2": 2,
            "row-cell-3": 3,
            "row-cell-4": 4,
            "row-cell-5": 5,
            "row-cell-6": 6,
            "row-cell-7": 7,
            "row-cell-8": 8,
            "row-cell-9": 9,
            "row-cell-10": 10,
            "row-cell-11": 11,
            "row-cell-12": 12,
            "row-cell-13": 13,
            "row-cell-14": 14,
            "row-cell-15": 15,
        },
        numberArray: [
            "row-cell-1",
            "row-cell-2",
            "row-cell-3",
            "row-cell-4",
            "row-cell-5",
            "row-cell-6",
            "row-cell-7",
            "row-cell-8",
            "row-cell-9",
            "row-cell-10",
            "row-cell-11",
            "row-cell-12",
            "row-cell-13",
            "row-cell-14",
            "row-cell-15",
            "row-cell-0",
        ],
        numArray: [],
        allRandomElements: [],
        itemsPerRow: 4,
        rightPos: [4, 8, 12],
        leftPos: [3, 7, 11],
        numberOfSwaps: 0,
        isPlaying: false,
        reset: false,
        resumeGameFlag: false,
        timer: 0,
        minutes: 0,
        seconds: 0,
        pauseGame: true,
        blankElem_ID: "row-cell-0",
        swappedElem_ID: null,
        userWinFlag: false,
    },

    getters: {

        numberID: (state) => {
            return state.numberID;
        },

        allRandomElements: (state) => {
            return state.allRandomElements;
        },

        numberArray: (state) => {
            return state.numberArray;
        },

        itemsPerRow: (state) => {
            return state.itemsPerRow;
        },

        moves: (state) => {
            return state.numberOfSwaps;
        },

        atCorrectPosition: (state) => {
            return state.atCorrectPosition;
        },

        isPlaying: (state) => {
            return state.isPlaying;
        },

        reset: (state) => {
            return state.reset;
        },

        resumeGameFlag: (state) => {
            return state.resumeGameFlag;
        },

        minutes: (state) => {
            return state.minutes;
        },

        seconds: (state) => {
            return state.seconds;
        },

        pauseGame: (state) => {
            return state.pauseGame;
        },

        userWinFlag: (state) => {
            return state.userWinFlag;
        },

        validPosition: (state) => {
            // index of ElemID 1
            let Elem_Index = state.allRandomElements.indexOf(state.blankElem_ID);

            // top, bottom, left, right element ID's
            let topElem_ID =
                state.allRandomElements[
                    state.allRandomElements.indexOf(state.blankElem_ID) - 4
                ];
            let bottomElem_ID =
                state.allRandomElements[
                    state.allRandomElements.indexOf(state.blankElem_ID) + 4
                ];
            let leftElem_ID =
                state.allRandomElements[
                    state.allRandomElements.indexOf(state.blankElem_ID) - 1
                ];
            let rightElem_ID =
                state.allRandomElements[
                    state.allRandomElements.indexOf(state.blankElem_ID) + 1
                ];

            if (
                state.leftPos.includes(Elem_Index - 1) &&
                state.swappedElem_ID == leftElem_ID
            ) {
                return false;
            }

            if (
                state.rightPos.includes(Elem_Index + 1) &&
                state.swappedElem_ID == rightElem_ID
            ) {
                return false;
            }

            if (
                state.swappedElem_ID == topElem_ID ||
                state.swappedElem_ID == bottomElem_ID ||
                state.swappedElem_ID == leftElem_ID ||
                state.swappedElem_ID == rightElem_ID
            ) {
                return true;
            }
            return false;
        },

        isSolvable: (state) => {
            let parity = 0;
            let gridWidth = 4;
            let row = 0;
            let blankRow = 0;
            for (let i = 0; i < state.allRandomElements.length; i++) {
                if (i % gridWidth == 0) {
                    row++;
                }
                if (state.allRandomElements[i] == 0) {
                    blankRow = row;
                    continue;
                }
                for (var j = i + 1; j < state.allRandomElements.length; j++) {
                    if (state.allRandomElements[i] > state.allRandomElements[j] && state.allRandomElements[j] != 0) {
                        parity++;
                    }
                }
            }

            if (gridWidth % 2 == 0) {
                if (blankRow % 2 == 0) {
                    return parity % 2 == 0;
                } else {
                    return parity % 2 != 0;
                }
            } else {
                return parity % 2 == 0;
            }
        },

        updateTimer: (state) => {
            return (parseInt(state.minutes * 60) + parseInt(state.seconds));
        },

        checkIfUserWin: (state) => {
            return JSON.stringify(state.numberArray) ===
                JSON.stringify(state.allRandomElements);
        },

    },

    mutations: {

        arrangeNumbersRandomly: (state) => {
            state.allRandomElements = [];
            state.numArray = [...state.numberArray];
            for (let num of state.numberArray) {
                let randomElement =
                    state.numArray[
                        Math.floor(Math.random() * state.numArray.length)
                    ];

                const index = state.numArray.indexOf(randomElement);

                if (index > -1) {
                    state.numArray.splice(index, 1);
                }
                state.allRandomElements.push(randomElement);
            }
        },

        swapElements: (state, {
            blankElemID,
            payload
        }) => {
            let index1 = state.allRandomElements.indexOf(blankElemID);
            let index2 = state.allRandomElements.indexOf(payload);
            state.allRandomElements[index1] = payload;
            state.allRandomElements[index2] = blankElemID;
        },

        increaseMoves: (state) => {
            state.numberOfSwaps++;
        },

        resetMoves: (state) => {
            state.numberOfSwaps = 0;
            localStorage.clear();
        },

        addPositionToLocalStorage: (state) => {
            window.localStorage.setItem(
                "Position",
                JSON.stringify([...state.allRandomElements])
            );
        },

        addMovesToLocalStorage: (state) => {
            window.localStorage.setItem("Moves", state.numberOfSwaps);
        },

        playGame: (state) => {
            state.isPlaying = !state.isPlaying;
            state.reset = false;
        },

        resetFlag: (state) => {
            state.isPlaying = false;
            state.reset = !state.reset;
        },

        resetUserWinFlag: (state) => {
            state.userWinFlag = !state.userWinFlag
        },

        resumeFlag: (state) => {
            state.resumeGameFlag = !state.resumeGameFlag;
        },

        resumeGame: (state) => {
            let time = localStorage.getItem("Time");
            let moves = localStorage.getItem("Moves");
            let position = localStorage.getItem("Position");
            // resume moves
            state.numberOfSwaps = moves != null ? moves : 0;

            // resume time
            let resumeTime = time.split(':');
            state.minutes = resumeTime[0];
            state.seconds = resumeTime[1];
            state.timer = store.getters.updateTimer;

            // resume position of elements
            state.allRandomElements = JSON.parse(position);
        },

        checkLocalStorage: (state) => {
            if (!(localStorage.length === 0)) {
                state.resumeGameFlag = true;
            }
        },

        startTimer: (state) => {
            if (!state.pauseGame) {
                state.timer++;
                state.minutes = parseInt(state.timer / 60);
                state.seconds = state.timer % 60;
                window.localStorage.setItem(
                    "Time",
                    `${("0" + state.minutes).slice(-2)}:${("0" + state.seconds).slice(-2)}`
                );
            }
        },

        resetTime: (state) => {
            state.seconds = 0;
            state.minutes = 0;
            state.timer = 0;
            clearInterval(window.gameTime);
            localStorage.clear();
            state.pauseGame = true;
        },

        pause: (state) => {
            state.pauseGame = !state.pauseGame;
        },

    },

    actions: {

        arrangeNumbersRandomly: (context) => {
            context.commit('arrangeNumbersRandomly');
            if (context.getters.isSolvable) {
                return context.state.allRandomElements;
            } else {
                context.dispatch("arrangeNumbersRandomly");
            }
        },

        swapValues: ({
            commit,
            getters,
            dispatch,
            state
        }, payload) => {
            state.swappedElem_ID = payload
            if (getters.validPosition) {
                let blankElemID = state.blankElem_ID;
                commit("increaseMoves")
                commit("swapElements", {
                    blankElemID,
                    payload
                });
                commit("addPositionToLocalStorage")
                commit("addMovesToLocalStorage");
                dispatch("checkIfUserWin");
            }
        },

        checkIfUserWin: ({
            getters,
            state,
            commit
        }) => {
            if (getters.checkIfUserWin) {
                commit('pause');
                state.userWinFlag = true
                let time = localStorage.getItem('Time');
                let moves = localStorage.getItem("Moves");
                let data = {
                    "moves": `${moves}`,
                    "time": `${time}`
                }

                axios
                    .post('https://4y9i0s4db7.execute-api.us-east-1.amazonaws.com/player-stats', data)
                    .then(response => {
                        return response.json()

                    })
                    .catch(err => console.log(err));
            }
        },

        startTimer: (context) => {
            clearInterval(window.gameTime);
            window.gameTime = setInterval(() => {
                context.commit('startTimer');
            }, 1000);
        },

        pause: (context) => {
            context.commit('pause');
            context.dispatch('startTimer');
        },

        resetGame: (context) => {
            context.commit('resetTime');
            context.commit('arrangeNumbersRandomly');
            context.commit('resetMoves');
            context.commit('resetFlag');
        },

        checkLocalStorage: (context) => {
            context.commit('checkLocalStorage');
        },

        resumeFlag: (context) => {
            context.commit('resumeFlag');
        },

        resumeGame: (context) => {
            context.commit('resumeGame');
            let position = localStorage.getItem("Position");
            if (position == null) {
                context.commit("arrangeNumbersRandomly");
            }
        },

        playGame: (context) => {
            context.commit('playGame');
        },

        resetUserWinFlag: (context) => {
            context.commit('resetUserWinFlag');
        },

    },
})