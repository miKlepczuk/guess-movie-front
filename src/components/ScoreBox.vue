<template>
  <div class="score-box">
    <h2>Twoje punkty: {{ userScore }}</h2>
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
</style>
