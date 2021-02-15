<template>
  <div class="home">
    <GameBoard />
  </div>
</template>

<script>
import GameBoard from "@/components/GameBoard.vue";

export default {
  name: "Home",
  components: {
    GameBoard,
  },
};
</script>
