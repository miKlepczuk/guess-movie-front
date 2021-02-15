<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <PuzzleBoard />
  </div>
</template>

<script>
// @ is an alias to /src
import PuzzleBoard from "@/components/PuzzleBoard.vue";

export default {
  name: "Home",
  components: {
    PuzzleBoard,
  },
};
</script>
