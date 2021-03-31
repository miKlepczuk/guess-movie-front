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
.puzzle-indicator {
  font-size: 2rem;

}

.separator {
  font-size: 1.8rem;
  font-weight: 300;
}

@media (max-width: 768px) {
  .puzzle-indicator,
  .separator {
    font-size: 1.7rem;
  }
}
</style>
