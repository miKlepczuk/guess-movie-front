<template>
  <div>
    <Navbar />

    <div class="wrapper">
      <router-view />
      <!-- <Footer /> -->
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
// import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    // Footer,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Londrina+Solid&family=Open+Sans+Condensed:wght@300&family=Roboto:wght@300;400&display=swap");

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  color: #999;
  font-family: "Varela Round", sans-serif;
  background: linear-gradient(rgba(60, 60, 60, 0.25), rgba(60, 60, 60, 0.25)),
    url("assets/images/web-pattern.png");
}
.wrapper{margin-top:50px;}

img {
  max-width: 100%;
  height: auto;
}

.btn:focus,
a:focus {
  outline: none !important;
  box-shadow: none !important;
}

.btn-lg {
  min-height: 40px;
}

.btn {
  border-radius: 2px;
  transition: all 0.5s;
}

.btn,
.btn:active {
  background: #4aba70 !important;
  border: none !important;
  line-height: normal !important;
}

.btn:hover,
.btn:focus {
  background: #42ae68 !important;
}

.btn-outline-primary {
  color: #4aba70 !important;
  background: transparent !important;
}

.btn-outline-primary:hover,
.btn-outline-primary:focus {
  background: transparent !important;
}
</style>
