<template>
  <div class="puzzleGame">
    <Header />
    <GameBox />
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import GameBox from "../components/GameBox.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "PuzzleGame",
  components: {
    Header,
    GameBox,
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
