<template>
  <div class="puzzle-picture">
    <img :src="puzzleImage" />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "PuzzlePicture",
  setup() {
    const store = useStore();
    const puzzleImage = computed(() => store.getters.currentPuzzleImage);
    return { puzzleImage };
  },
};
</script>


<style scoped>
.puzzle-picture {
  margin-bottom: 50px;
}
</style>

 