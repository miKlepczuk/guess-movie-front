<template>
  <div class="puzzle-gaps">_ _ _ _ _ _ &nbsp; &nbsp; _ _ _ _ _</div>
</template>

<script>
export default {
  name: "PuzzleGaps",
  props: {
    sentence: String,
  },

  setup(props) {
    console.log(props.sentence);
  },
};
</script>