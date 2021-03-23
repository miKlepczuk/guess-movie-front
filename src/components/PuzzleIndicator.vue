<template>
  <div class="puzzle-indicator">
    <span class="current-puzzle">{{ userPuzzleId }}</span>
    <span class="separator">/</span>
    <span class="puzzles-quantity">{{ puzzlesQuantity }}</span>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "PuzzleIndicator",
  setup() {
    const store = useStore();
    const puzzlesQuantity = computed(() => store.getters.puzzlesQuantity);
    const userPuzzleId = computed(() => store.getters.userPuzzleId);
    return { puzzlesQuantity, userPuzzleId };
  },
};
</script>
<style scoped>
.current-puzzle {
  font-weight: 400;
  font-size: 40px;
  color: rgb(31, 30, 30);
}
.separator,
.puzzles-quantity {
  font-weight: 300;
  padding: 0 3px;
  color: #404040;
  font-size: 37px;
}
</style>
