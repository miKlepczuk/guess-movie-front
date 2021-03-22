<template>
  <div>
    <Navbar />

    <div id="app">
      <router-view />
    </div>
    <Footer />
    
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar, Footer
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 100px;
  min-height: calc(100vh - 222px);
}

body {
  color: #999;
  background: #f5f5f5;
  font-family: "Varela Round", sans-serif;
}

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
