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
      this.GetPuzzles();
    }
  },
  computed: {
    ...mapGetters({ isAuthorized: "isAuthorized" }),
  },

  methods: {
    ...mapActions(["GetPuzzles"]),
    submit() {
      try {
        this.GetPuzzles();
      } catch (error) {
        throw "Sorry you can't get puzzles now!";
      }
    },
  },
};
</script>
