<template>
  <div class="puzzle-picture border">
          <PuzzleIndicator />
    <img :src="puzzleImage" class="img-fluid" />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import PuzzleIndicator from "@/components/PuzzleIndicator.vue";

export default {
  name: "PuzzlePicture",
  components: { PuzzleIndicator},
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
  background: whitesmoke;
  padding: 20px 50px 50px;
}
</style>

 