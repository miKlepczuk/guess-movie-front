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
  font-size: 1.6rem;
  line-height: 1;
  margin-bottom: 20px;
}

.separator {
  font-weight: 300;
}

@media (max-width: 768px) {
  .puzzle-indicator {
    font-size: 1.3rem;
    margin-bottom: 15px;
    margin-top: -1.3rem;
  }
}
</style>
