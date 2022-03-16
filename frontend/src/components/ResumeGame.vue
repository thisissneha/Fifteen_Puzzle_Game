<template>
  <div v-if="resumeGameFlag && !userWinFlag" class="resume-game centered-game">
    <div class="resume-body-game">
      <div>
        <p class="resume-body">Do you wish to continue ?</p>
        <img
          class="game-logo"
          src="@/assets/img/game-logo.jpg"
          alt="game-logo"
        />
      </div>
      <button class="resume-button" @click="resumeGame(), resumeFlag()">
        Resume Game
      </button>
      <button class="resume-button" @click="resetGame(), resumeFlag()">
        New Game
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ResumeGame",

  computed: {
    ...mapGetters(["resumeGameFlag", "userWinFlag"]),
  },

  methods: {
    resumeGame: function () {
      return this.$store.dispatch("resumeGame");
    },

    resetGame: function () {
      return this.$store.dispatch("resetGame");
    },

    resumeFlag: function () {
      this.$store.dispatch("resumeFlag");
    },
  },
};
</script>

<style>
.game-logo {
  height: 174px;
  margin: 14px;
}
.resume-body {
  font-size: 22px;
  color: mediumvioletred;
  margin-top: 38px;
  font-weight: 600;
}
.centered-game {
  top: 50%;
  left: 24%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  position: fixed;
}

.resume-game {
  width: 40%;
  height: 60%;
  border-radius: 26px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.resume-body-game {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  position: absolute;
}

.resume-button {
  padding: 10px 8px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  margin: 20px;
  width: 132px;
  text-align: center;
  border-radius: 6px;
  background-color: cornflowerblue;
  color: white;
  cursor: pointer;
}
</style>