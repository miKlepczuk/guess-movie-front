<template>
  <div class="sentence-mask">
    <div v-for="(item, index) in mask" :key="index">
      <p
        class="sentence-mask__single-sign"
        :index="index"
        :class="{
          'sign-space': item.letter == ' ',
          'correct-letter': item.isHinted,
        }"
        :style="clicableCss(item)"
          @click="removeLetterFromMask(item)"
      >
        <span v-if="item.letter !== '_'"> {{ item.letter }} </span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SentenceMask",

  data() {
    return {};
  },
  methods: {
    ...mapActions(["removeLetterFromMask"]),

    clicableCss(item) {
      if (item.letter !== " " && item.letter !== "_" && item.isHinted == false)
        return "cursor: pointer";
      else return "cursor: auto";
    },
  },
  created() {},
  computed: {
    ...mapGetters(["mask"]),
  },
  watch: {},
};
</script>

<style scoped>
.sentence-mask {
  font-size: 50px;
  letter-spacing: 5px;
  text-transform: capitalize;
  margin-bottom: 50px;
}
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
.sentence-mask__single-sign {
  font-size: 35px;
  line-height: 35px;
  width: 35px;
  height: 35px;
  margin: 0 3px;
  text-align: center;
  border-bottom: 2px solid gray;
}
.sign-space {
  border-bottom: 2px solid transparent;
}
.correct-letter {
  color: #05bf4e;
  border-color: transparent;
}
</style>