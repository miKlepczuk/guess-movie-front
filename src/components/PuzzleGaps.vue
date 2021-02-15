<template>
  <div class="puzzle-gaps">
    <span class="sentence-mask">{{ sentenceMask }}</span>
  </div>
</template>

<script>
export default {
  name: "PuzzleGaps",
  props: {
    sentence: String,
  },

  data() {
    return {
      sentenceMask: "",
    };
  },
  methods: {
    createSentenceMask() {
      String.prototype.cleanup = function () {
        return this.toLowerCase().replace(/[a-zA-Z]/g, "_");
      };

      this.sentenceMask = this.sentence.cleanup();
    },
  },
  mounted() {
    this.createSentenceMask();
  },
};
</script>

<style scoped>
.sentence-mask {
  font-size: 30px;
  letter-spacing: 5px;
}
</style>