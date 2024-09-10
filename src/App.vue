<script setup lang="ts">
import { RouterView } from "vue-router";
import TopbarNav from "./components/TopbarNav.vue";
</script>
<template>
  <header id="topbar-container">
    <TopbarNav />
  </header>
  <main id="main-container">
    <RouterView />
  </main>
</template>
<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
main {
  max-width: 900px;
  margin: 0 auto;
}
body {
  background-color: rgb(244, 244, 244);
}
#topbar-container {
  position: fixed;
  width: 100%;
  background-color: white;
  z-index: 1;
  top: 0;
  left: 0;
}
#main-container {
  margin-top: 7rem;
}
</style>
