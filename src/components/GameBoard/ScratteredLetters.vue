<template>
  <div class="puzzle-scrattered-letters">
    <div class="letters">
      <div v-for="(item, index) in scratteredLetters" :key="index">
        <span
          v-show="item.isVisible"
          class="letters__single-letter"
          :index="index"
          @click="chooseItemToMask(item)"
        >
          {{ item.letter }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PuzzleScratteredLetters",

  data() {
    return {};
  },
  methods: {
    ...mapActions(["assignItemToMask"]),

    chooseItemToMask(item) {
      let playload = {
        position: this.firstFreePositionInMask,
        itemScrattered: item,
        isHinted: false,
      };
      this.assignItemToMask(playload);
    },
  },
  created() {},
  computed: {
    ...mapGetters(["scratteredLetters"]),
    ...mapGetters(["firstFreePositionInMask"]),
  },
  watch: {},
};
</script>

<style scoped>
.puzzle-scrattered-letters {
  min-height: 45px;
}
.letters,
.sentence-mask {
  display: flex;
  align-items: center;
  justify-content: center;
}
.letters__single-letter {
  border: 1px solid rgb(54, 54, 54);
  width: 40px;
  height: 40px;
  margin: 0 5px;
  font-size: 30px;
  display: inline-block;
  line-height: 40px;
  text-transform: capitalize;
}
.letters__single-letter:hover {
  cursor: pointer;
  border: 1px solid rgb(0, 0, 0);
  color: rgb(0, 0, 0);
  font-size: 32px;
}
</style>