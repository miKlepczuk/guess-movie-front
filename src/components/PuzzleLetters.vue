<template>
  <div class="letters-box">{{ sentence }}</div>
</template>

<script>
export default {
  name: "PuzzleLetters",
  props: {
    sentence: String,
  },

  setup(props) {
    console.log(props.sentence);
  },
};
</script>
    