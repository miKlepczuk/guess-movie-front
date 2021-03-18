<template>
  <div class="puzzle-indicator">
    <h3>
      <span>{{ userPuzzleId + 1 }}</span>
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
    const userPuzzleId = computed(() => store.getters.userPuzzleId);
    return { puzzlesQuantity, userPuzzleId };
  },
};
</script>
<style scoped>
</style>
