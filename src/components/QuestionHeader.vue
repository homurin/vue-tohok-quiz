<script setup lang="ts">
defineProps<{ currQuestion: string; barPercentage: string }>();
</script>
<template>
  <header>
    <h2>{{ currQuestion }}</h2>
    <div class="bar">
      <div class="bar__progress" :style="{ width: barPercentage }"></div>
    </div>
  </header>
</template>
<style scoped>
header h2 {
  margin-top: 1em;
  font-size: 1.5em;
  margin-bottom: 0.5em;
}
.bar {
  width: 100%;
  height: 2em;
  border: 3px solid yellowgreen;
  margin-bottom: 1.5em;
}

.bar__progress {
  width: 0%;
  height: 100%;
  background-color: yellowgreen;
}
</style>
