<template>
  <PuzzleGame />
  <GameStatistics />
</template>

<script>
// @ is an alias to /src
import PuzzleGame from "../components/PuzzleGame.vue";
import GameStatistics from "../components/GameStatistics.vue";

export default {
  name: "HomeView",
  components: {
    PuzzleGame,
    GameStatistics,
  },
};
</script>

<style>
/* .game-wrapper-class {
  margin: auto;
  width: 550px;
} */
</style>
