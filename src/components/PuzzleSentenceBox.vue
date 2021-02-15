<template>
  <div class="puzzle-sentence-box">
    <PuzzleGaps :sentence="puzzleSentence" />
    <PuzzleLetters :sentence="puzzleSentence" />
  </div>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue";

import PuzzleGaps from "@/components/PuzzleGaps.vue";
import PuzzleLetters from "@/components/PuzzleLetters.vue";

export default {
  name: "PuzzleSentenceBox",
  components: { PuzzleGaps, PuzzleLetters },
  setup() {
    const store = useStore();
    const puzzleSentence = computed(() => store.getters.currentPuzzleSentence);
    return { puzzleSentence };
  },
};
</script>

<style scoped>
</style>