<template>
  <div class="score-box d-flex justify-content-end">
    <div
      class="score rounded-sm d-flex align-items-center justify-content-center"
    >
      <img class="score__image" src="../../assets/images/score.svg" />
      <span class="score__points">{{ userScore }}</span>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "ScoreBox",
  setup() {
    const store = useStore();
    const userScore = computed(() => store.getters.userScore);
    return { userScore };
  },
};
</script>

<style scoped>
.score-box {
  line-height: 1;
}
.score {
  display: inline-block;
}
.score__image {
  display: inline-block;
  height: 1.6rem;
}
.score__points {
  font-size: 1.6rem;
  color: rgb(56, 56, 56);
  padding-left: 5px;
}
@media (max-width: 768px) {
  .score__points {
    font-size: 1.3rem;
  }
  .score__image {
    height: 1.3rem;
  }
  .score-box {
    margin-bottom: 0;
  }
}
</style>
