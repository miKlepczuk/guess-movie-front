<template>
  <div class="puzzle-indicator">
    <h3>
      <span>{{ puzzleId + 1 }}</span>
      /
      <span>{{ puzzlesQuantity }}</span>
    </h3>
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
    const puzzleId = computed(() => store.getters.currentPuzzleId);
    return { puzzlesQuantity, puzzleId };
  },
};
</script>
<style scoped>
</style>
