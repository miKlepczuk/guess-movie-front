<template>
  <div class="score-box d-flex justify-content-end">
    <div
      class="score rounded-sm d-flex align-items-center justify-content-center"
    >
      <img class="score__image" src="../../assets/images/score.svg" width="30" />
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
  margin: 10px 0;
}
.score {
  display: inline-block;
  padding: 5px 9px;
}
.score__image {
  display: inline-block;
}
.score__points {
  font-size: 2rem;
  color: rgb(56, 56, 56);
  padding-left: 5px;
}
@media (max-width: 768px) {
  .score__points{
  font-size: 1.5rem;
  }
}
</style>
