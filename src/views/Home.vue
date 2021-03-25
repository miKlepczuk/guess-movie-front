<template>
  <div class="home">
    <GameBoard v-if="puzzlesQuantity > 0" />
    <div v-else>You must be logged in.</div>
  </div>
</template>

<script>
import GameBoard from "@/components/GameBoard.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    GameBoard,
  },

  created() {
    if (this.isAuthorized == true) {
        this.getPuzzles();
    }
  },
  computed: {
    ...mapGetters(["isAuthorized"]),
    ...mapGetters(["puzzlesQuantity"]),
  },

  methods: {
    ...mapActions(["getPuzzles"]),
  },
};
</script>
