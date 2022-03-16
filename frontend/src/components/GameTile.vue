<template>
  <div
    :class="{
      'correct-position': currentNumber == desiredNumber,
    }"
  >
    <p v-if="currentNumber !== 0">{{ currentNumber }}</p>
  </div>
</template>

<script>
export default {
  name: "GameTile",
  props: {
    posX: Number,
    posY: Number,
    currentNumber: Number,
    desiredNumber: Number,
  },
};
</script>

<style>
.correct-position {
  background-color: darkcyan;
  border-radius: 6px;
}
</style>