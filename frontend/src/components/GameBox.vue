<template>
  <div>
    <ResumeGame />
    <GameDetails />
    <div class="game">
      <div class="game-row" v-for="(row, i) in 4" v-bind:key="row">
        <div class="pos-row-cell" v-for="(col, j) in 4" v-bind:key="col">
          <GameTile
            :posX="i"
            :posY="j"
            :currentNumber="randomNumberArray[i * 4 + j]"
            :desiredNumber="elementNumberArray[i * 4 + j]"
            :ref="`pos-${i}-${j}`"
            @click="swapElementValues(i, j)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GameTile from "./GameTile.vue";
import GameDetails from "./GameDetails.vue";
import ResumeGame from "./ResumeGame.vue";

import { mapGetters } from "vuex";

export default {
  name: "GameBox",
  components: {
    GameTile,
    GameDetails,
    ResumeGame,
  },

  computed: {
    ...mapGetters(["randomNumberArray", "elementNumberArray"]),
  },
  methods: {
    swapElementValues: function (elemAtPosX, elemAtPosY) {
      let clickedElem = { ...this.$refs[`pos-${elemAtPosX}-${elemAtPosY}`][0] };
      let currNumber = clickedElem.currentNumber;
      if (
        this.swappingAtValidPosition(elemAtPosX, elemAtPosY) &&
        currNumber !== 0
      ) {
        // increase moves
        this.increaseMoves();

        // swap tiles
        let index1 = elemAtPosX * 4 + elemAtPosY;
        let index2 = this.randomNumberArray.indexOf(0);
        this.randomNumberArray[index1] = 0;
        this.randomNumberArray[index2] = currNumber;

        // add moves and position to localStorage
        this.addPositionToLocalStorage();
        this.addMovesToLocalStorage();

        // check if user win
        this.checkIfUserWin();
      }
    },

    swappingAtValidPosition: function (elemAtPosX, elemAtPosY) {
      // top, bottom, left, right element
      let topElementPosition = elemAtPosY - 1;
      let bottomElementPosition = elemAtPosY + 1;
      let leftElementPosition = elemAtPosX - 1;
      let rightElementPosition = elemAtPosX + 1;

      if (
        (topElementPosition >= 0 &&
          this.randomNumberArray[elemAtPosX * 4 + topElementPosition] === 0) ||
        (bottomElementPosition <= 3 &&
          this.randomNumberArray[elemAtPosX * 4 + bottomElementPosition] ===
            0) ||
        (leftElementPosition >= 0 &&
          this.randomNumberArray[leftElementPosition * 4 + elemAtPosY] === 0) ||
        (rightElementPosition <= 3 &&
          this.randomNumberArray[rightElementPosition * 4 + elemAtPosY] === 0)
      ) {
        return true;
      }
      return false;
    },

    checkLocalStorage: function () {
      this.$store.dispatch("checkLocalStorage");
    },

    addMovesToLocalStorage: function () {
      this.$store.dispatch("addMovesToLocalStorage");
    },

    addPositionToLocalStorage: function () {
      this.$store.dispatch("addPositionToLocalStorage");
    },

    increaseMoves: function () {
      this.$store.dispatch("increaseMoves");
    },

    checkIfUserWin: function () {
      this.$store.dispatch("checkIfUserWin");
    },

    arrangeNumbersRandomly: function () {
      this.$store.dispatch("arrangeNumbersRandomly");
    },
  },

  beforeMount() {
    this.checkLocalStorage();
  },
  created() {
    this.arrangeNumbersRandomly();
  },
};
</script>

<style>
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
  font-size: 32px;
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