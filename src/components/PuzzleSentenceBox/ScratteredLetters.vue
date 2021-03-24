<template>
  <div class="puzzle-scrattered-letters">
    <div class="letters">
      <div v-for="(item, index) in scratteredLetters" :key="index">
        <span
          v-show="item.isVisible"
          class="letters__single-letter"
          :index="index"
          @click="chooseLetterToMask(item)"
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
    ...mapActions(["chooseLetterToMask"]),
  },
  created() {},
  computed: {
    ...mapGetters(["scratteredLetters"]),
  },
  watch: {},
};
</script>

<style scoped>
.letters,
.sentence-mask {
  display: flex;
  align-items: center;
  justify-content: center;
}
.letters__single-letter {
  border: 1px solid black;
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
}
</style>