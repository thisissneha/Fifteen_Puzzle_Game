import Vuex from 'vuex';
import axios from 'axios';

export const store = new Vuex.Store({

    state: {

        elementNumberArray: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0,
        ],
        randomNumberArray: [],
        numberOfSwaps: 0,
        isPlaying: false,
        reset: false,
        resumeGameFlag: false,
        timer: 0,
        minutes: 0,
        seconds: 0,
        pauseGame: true,
        userWinFlag: false,
    },

    getters: {

        randomNumberArray: (state) => {
            return state.randomNumberArray;
        },

        elementNumberArray: (state) => {
            return state.elementNumberArray;
        },

        moves: (state) => {
            return state.numberOfSwaps;
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

        isSolvable: (state) => {
            let parity = 0;
            let gridWidth = 4;
            let row = 0;
            let blankRow = 0;
            for (let i = 0; i < state.randomNumberArray.length; i++) {
                if (i % gridWidth == 0) {
                    row++;
                }
                if (state.randomNumberArray[i] == 0) {
                    blankRow = row;
                    continue;
                }
                for (var j = i + 1; j < state.randomNumberArray.length; j++) {
                    if (
                        state.randomNumberArray[i] > state.randomNumberArray[j] &&
                        state.randomNumberArray[j] != 0
                    ) {
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
            return JSON.stringify(state.elementNumberArray) ===
                JSON.stringify(state.randomNumberArray);
        },

    },

    mutations: {

        arrangeNumbersRandomly: (state) => {
            const nums = new Set();
            while (nums.size !== 16) {
                nums.add(Math.floor(Math.random() * 16));
            }
            state.randomNumberArray = [...nums];
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
                JSON.stringify([...state.randomNumberArray])
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
            state.randomNumberArray = JSON.parse(position);
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
                return context.state.randomNumberArray;
            } else {
                context.dispatch("arrangeNumbersRandomly");
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
                    .post('http://localhost:3000/player-stats', data)
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

        addPositionToLocalStorage: (context) => {
            context.commit('addPositionToLocalStorage');
        },

        addMovesToLocalStorage: (context) => {
            context.commit('addMovesToLocalStorage');
        },

        resumeFlag: (context) => {
            context.commit('resumeFlag');
        },

        increaseMoves: (context) => {
            context.commit('increaseMoves');
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