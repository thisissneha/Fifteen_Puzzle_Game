<template>
  <div class="stats">
    <div class="leaderboard centered" id="player-stats">
      <header class="leaderboard-header">
        <div class="title">
          <button class="stats-back-btn" id="stats-back-btn">
            <i class="fa fa-hand-o-left"></i>
          </button>
          <h3>Players Stats</h3>
        </div>
      </header>

      <div class="leaderboard-body">
        <div style="display: flex">
          <div class="padding-font">Player</div>
          <div class="padding-font">Player ID</div>
          <div class="padding-font">Moves</div>
          <div class="padding-font">Total Time</div>
        </div>

        <ul v-for="user in stats" v-bind:key="user">
          <li class="stats-data">
            <img src="@/assets/img/user-logo.jpg" class="player-logo" />
            <span class="player-li">{{ user.userID }}</span>
            <span class="player-li">{{ user.moves }}</span>
            <span class="player-li">{{ user.time }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameStatistics",

  data() {
    return {
      stats: {},
    };
  },

  created() {
    fetch("http://localhost:3000/stats")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.stats = data.message;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style>
.stats {
  background-color: aliceblue;
  width: 50%;
  height: 100vh;
}

.stats-back-btn {
  top: 0;
  background-color: transparent;
  border: hidden;
  position: absolute;
}

.centered {
  position: fixed;
}

.leaderboard {
  width: 46%;
  height: 96%;
  border-radius: 26px;
  overflow: hidden;
  margin: 10px;
}

.title {
  height: 100%;
  width: 100%;
  top: 40%;
  position: relative;
  display: flex;
  -webkit-tap-highlight-color: transparent;
}

.title h3 {
  color: #fcfcfc;
  text-transform: uppercase;
  font-family: sans-serif;
  text-align: center;
  flex: auto;
}

.leaderboard-header {
  top: 0;
  height: 10%;
  width: 100%;
  background-color: #772cdc;
  position: absolute;
  padding: 0 28px;
}

.leaderboard-body {
  top: 10%;
  width: 100%;
  height: 90%;
  background-color: #ffffff;

  position: absolute;
}

.padding-font {
  padding: 12px 10px;
  font-size: 16px;
  font-weight: 700;
  width: 20%;
  text-align: center;
}

.stats-data {
  display: flex;
  background-color: #e4dbec99;
  margin: 8px 8px;
  justify-content: center;
  border-radius: 6px;
}
.player-logo {
  height: 30px;
  margin: 0px 8%;
  border-radius: 26px;
}

.player-li {
  font-size: 16px;
  width: 25%;
  text-align: center;
  line-height: 2;
}
</style>