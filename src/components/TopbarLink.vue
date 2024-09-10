<script setup lang="ts">
import { RouterLink } from "vue-router";
import navConfigs from "@/configs/nav.config";
</script>
<template>
  <ul class="nav-container__link-container">
    <li v-for="(navConfig, id) in navConfigs" :key="id">
      <RouterLink class="router-link" active-class="active" :to="navConfig.link">{{
        navConfig.name
      }}</RouterLink>
    </li>
  </ul>
</template>
<style scoped>
.router-link {
  text-decoration: none;
  color: rgb(91, 91, 91);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bolder;
}

.active {
  color: black;
}

.nav-container__link-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  gap: 1em;
  z-index: 2;
}
</style>
