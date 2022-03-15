<template>
  <div class="puzzleGame">
    <Header />
    <Game />
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Game from "../components/Game.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "PuzzleGame",
  components: {
    Header,
    Game,
    Footer,
  },
};
</script>

<style>
.puzzleGame {
  width: 50%;
  /* background-color: aliceblue; */
}
</style>
