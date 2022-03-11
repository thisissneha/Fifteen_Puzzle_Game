<template>
  <div class="puzzleGame">
    <Header />
    <Game />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Game from "../components/Game.vue";

export default {
  name: "PuzzleGame",
  components: {
    Header,
    Game,
  },
};
</script>

<style>
.puzzleGame {
  width: 50%;
  background-color: aliceblue;
}
</style>
