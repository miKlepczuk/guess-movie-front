<template>
  <div class="home">
    <GameBoard v-if="puzzlesQuantity > 0" />
    <Presentation v-if="showPresentation == true && puzzlesQuantity == 0" />
  </div>
</template>

<script>
import GameBoard from "@/components/GameBoard.vue";
import Presentation from "@/components/Presentation.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    GameBoard,
    Presentation,
  },
  data() {
    return {
      showPresentation: false,
    };
  },
  created() {
    this.showPresentation = !this.isAuthorized;
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
