<template>
  <div class="home">
    <GameBoard v-if="isAuthorized" />
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

  created: function () {
    if (this.isAuthorized == true) {
      this.getPuzzles();
    }
  },
  computed: {
    ...mapGetters({ isAuthorized: "isAuthorized" }),
  },

  methods: {
    ...mapActions(["getPuzzles"]),
    submit() {
      try {
        this.getPuzzles();
      } catch (error) {
        throw "Sorry you can't get puzzles now!";
      }
    },
  },
};
</script>
