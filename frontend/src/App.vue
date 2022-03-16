<template>
  <router-view />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Merienda&display=swap");
* {
  margin: 0px;
  padding: 0px;
  font-family: "Merienda", cursive;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  background-color: aliceblue;
}

@media screen and (max-width: 430px) {
  .game {
    height: 222px !important;
    width: 254px !important;
  }
  .pos-row-cell {
    font-size: 24px !important;
    width: 60px !important;
    height: 50px !important;
  }
  .resume-game {
    width: 90% !important;
    height: 50% !important;
  }

  .centered-game {
    left: 50% !important;
  }

  .resume-button {
    margin-top: 0px !important;
    font-size: 14px !important;
    width: 112px !important;
  }

  .resume-body {
    font-size: 18px !important;
  }

  .game-logo {
    height: 100px !important;
  }

  .overlay {
    font-size: 50px !important;
    line-height: 214px !important;
    height: 234px !important;
    width: 258px !important;
  }

  .userWin {
    top: 40% !important;
    left: 50% !important;
    width: 90% !important;
    height: 40% !important;
  }
}

@media screen and (max-width: 660px) {
  #app {
    display: block;
  }

  .puzzleGame,
  .stats {
    width: 100% !important;
  }

  .leaderboard {
    width: 90% !important;
    margin: 10px 5% !important;
  }

  .overlay {
    margin: 0px auto !important;
    left: 0px !important;
    right: 0px !important;
  }
}

@media screen and (max-width: 660px) and (min-width: 431px) {
  .resume-game {
    width: 80% !important;
  }

  .centered-game {
    left: 50% !important;
  }

  .userWin {
    left: 50% !important;
    width: 60% !important;
    height: 46% !important;
  }
}
</style>
