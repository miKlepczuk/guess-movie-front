<template>
  <div class="home">
    <ContentLoader v-if="showPresentation == false && puzzlesQuantity == 0" />
    <GameBoard v-if="puzzlesQuantity > 0" />
    <Presentation v-if="showPresentation == true || puzzlesQuantity == 0" />
  </div>
</template>

<script>
import GameBoard from "@/components/GameBoard.vue";
import Presentation from "@/components/Presentation.vue";
import ContentLoader from "@/components/ContentLoader.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    GameBoard,
    Presentation,
    ContentLoader,
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
