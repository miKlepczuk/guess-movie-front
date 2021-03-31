<template>
  <div class="snippet" data-title=".dot-pulse">
    <div class="stage">
      <div class="dot-pulse"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContentLoader",
};
</script>

<style scoped>
.snippet {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.74);
  z-index: 9999;
}
.stage {
  position: absolute;
  top: 50%;
  left: 50%;
}
.dot-pulse {
  position: relative;
  left: -9999px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #616161;
  color: #616161;
  box-shadow: 9999px 0 0 -5px #616161;
  animation: dotPulse 1.5s infinite linear;
  animation-delay: 0.25s;
}

.dot-pulse::before,
.dot-pulse::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #616161;
  color: #616161;
}

.dot-pulse::before {
  box-shadow: 9984px 0 0 -5px #616161;
  animation: dotPulseBefore 1.5s infinite linear;
  animation-delay: 0s;
}

.dot-pulse::after {
  box-shadow: 10014px 0 0 -5px #616161;
  animation: dotPulseAfter 1.5s infinite linear;
  animation-delay: 0.5s;
}

@keyframes dotPulseBefore {
  0% {
    box-shadow: 9984px 0 0 -5px #616161;
  }
  30% {
    box-shadow: 9984px 0 0 2px #616161;
  }
  60%,
  100% {
    box-shadow: 9984px 0 0 -5px #616161;
  }
}

@keyframes dotPulse {
  0% {
    box-shadow: 9999px 0 0 -5px #616161;
  }
  30% {
    box-shadow: 9999px 0 0 2px #616161;
  }
  60%,
  100% {
    box-shadow: 9999px 0 0 -5px #616161;
  }
}

@keyframes dotPulseAfter {
  0% {
    box-shadow: 10014px 0 0 -5px #616161;
  }
  30% {
    box-shadow: 10014px 0 0 2px #616161;
  }
  60%,
  100% {
    box-shadow: 10014px 0 0 -5px #616161;
  }
}
</style>