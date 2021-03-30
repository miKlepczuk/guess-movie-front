<template>
  <div
    v-if="message.length > 0"
    class="alert"
    :class="isError ? ' alert-danger' : ' alert-success'"
  >
    {{ message }}
  </div>
</template>
 <script>
export default {
  name: "Alert",
  props: ["isError", "message"],
};
</script>