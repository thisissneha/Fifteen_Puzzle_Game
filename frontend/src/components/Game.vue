<template>
  <div>
    <ResumeGame />
    <GameDetails />
    <div class="game">
      <div
        class="game-row"
        v-for="(group, i) in randomElemGroup"
        v-bind:key="group"
      >
        <div
          class="pos-row-cell"
          :id="elem"
          v-for="elem in allRandomElements.slice(
            i * itemsPerRow,
            (i + 1) * itemsPerRow
          )"
          v-bind:key="elem"
          :class="{
            'correct-position':
              allRandomElements.indexOf(elem) == numberArray.indexOf(elem),
          }"
          @click="swapValues(elem)"
        >
          {{ numberID[elem] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GameDetails from "./GameDetails.vue";
import ResumeGame from "./ResumeGame.vue";
import { mapGetters } from "vuex";

export default {
  name: "Game",
  components: {
    GameDetails,
    ResumeGame,
  },

  computed: {
    ...mapGetters([
      "allRandomElements",
      "itemsPerRow",
      "numberID",
      "numberArray",
    ]),

    randomElemGroup() {
      return Array.from(
        Array(
          Math.ceil(
            this.$store.state.allRandomElements.length /
              this.$store.state.itemsPerRow
          )
        ).keys()
      );
    },
  },
  methods: {
    swapValues: function (elemID) {
      return this.$store.dispatch("swapValues", elemID);
    },

    checkLocalStorage: function () {
      this.$store.dispatch("checkLocalStorage");
    },

    arrangeNumbersRandomly: function () {
      this.$store.dispatch("arrangeNumbersRandomly");
    },
  },

  beforeMount() {
    this.checkLocalStorage();
  },
  mounted() {
    this.arrangeNumbersRandomly();
  },
};
</script>

<style>
.pos-row-cell.correct-position {
  background-color: darkcyan;
}
.game {
  /* width: 80%; */
  height: 276px;
  width: 308px;
  margin: 2% auto;
}

.game-row {
  display: flex;
  border-radius: 6px;
  margin: 6px 0px;
  justify-content: center;
}

.pos-row-cell {
  font-size: 28px;
  font-weight: 600;
  line-height: 2;
  background-color: #5838a2;
  color: white;
  width: 70px;
  height: 64px;
  border-radius: 6px;
  margin: 0px 4px;
  cursor: pointer;
}
</style>