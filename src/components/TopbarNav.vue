<script setup lang="ts">
import TopbarLink from "./TopbarLink.vue";
</script>
<template>
  <nav class="nav-container">
    <div id="main-logo">
      <img src="../assets/logo.svg" alt="main-logo" />
      Touhou Quiz
    </div>
    <TopbarLink />
  </nav>
</template>
<style scoped>
.nav-container {
  width: 100%;
  padding: 1em;
  height: 10dvh;
  display: flex;
  box-shadow: 1px 3px 10px rgba(0, 0, 0, 0.232);
  position: relative;
  flex-direction: row;
  align-items: center;
  z-index: 2;
  top: 0;
  gap: 3em;
}

#main-logo {
  display: flex;
  align-items: center;
  font-size: 2em;
  font-weight: bolder;
  font-family: Arial, Helvetica, sans-serif;
  color: darkgreen;
}

#main-logo img {
  width: 45px;
  height: 45px;
  z-index: 2;
}
</style>
