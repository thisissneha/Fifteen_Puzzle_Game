
<template>
  <div class="gameDetails">
    <div class="moves">Moves - {{ moves }}</div>
    <div class="time">
      {{ ("0" + minutes).slice(-2) }} :
      {{ ("0" + seconds).slice(-2) }}
    </div>
  </div>

  <button class="btn" @click="pause(), playGame()" v-if="!isPlaying">
    Play Game
  </button>
  <button class="btn" @click="pause()" v-else-if="!pauseGame">
    Pause Game
  </button>
  <button class="btn" @click="pause()" v-else>Resume Game</button>
  <button class="btn" @click="resetGame()">Reset Game</button>
  <div
    class="overlay"
    @click="pause()"
    v-if="pauseGame && isPlaying && !reset && !resumeGameFlag && !userWinFlag"
  >
    Paused
  </div>
  <div
    class="overlay"
    @click="pause(), playGame()"
    v-if="(!isPlaying || reset) && !resumeGameFlag && !userWinFlag"
  >
    Play
  </div>

  <img
    class="userWin"
    v-if="userWinFlag"
    @click="resetUserWinFlag(), resetGame()"
    src="@/assets/img/winner.png"
    alt="win"
  />
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GameDetails",

  computed: {
    ...mapGetters([
      "reset",
      "isPlaying",
      "resumeGameFlag",
      "userWinFlag",
      "moves",
      "minutes",
      "seconds",
      "pauseGame",
    ]),
  },

  methods: {
    pause: function () {
      this.$store.dispatch("pause");
    },

    resetGame: function () {
      return this.$store.dispatch("resetGame");
    },

    playGame: function () {
      this.$store.dispatch("playGame");
    },

    resetUserWinFlag: function () {
      this.$store.dispatch("resetUserWinFlag");
    },
  },

  created() {
    return this.$store.dispatch("startTimer");
  },
};
</script>

<style scoped>
.gameDetails {
  display: flex;
  justify-content: center;
}
.time,
.moves {
  font-size: 14px;
  font-weight: 600;
  margin: 0px 18px;
  background-color: #ce4c78;
  color: white;
  padding: 8px 10px;
  border-radius: 6px;
  width: 86px;
}

.btn {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  background-color: darkslateblue;
  background-color: #ce4c78;
  color: white;
  text-decoration: none;
  cursor: pointer;
  margin: 18px;
  width: 128px;
}

.overlay {
  display: block;
  font-size: 70px;
  color: white;
  text-align: center;
  line-height: 256px;
  cursor: pointer;
  background-color: black;
  height: 292px;
  width: 314px;
  margin: 2px auto;
  left: 0px;
  right: 50%;
  /* padding: 6px 0px; */
  border-radius: 10px;
  position: absolute;
  opacity: 0.7;
}

.userWin {
  cursor: pointer;
  top: 48%;
  left: 24%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  position: fixed;
  width: 40%;
  height: 64%;
  border-radius: 26px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
</style>