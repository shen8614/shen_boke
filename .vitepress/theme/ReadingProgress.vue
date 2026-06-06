<template>
  <div class="reading-progress" :style="{ width: progress + '%' }"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)

function updateProgress() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  progress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
}

onMounted(() => window.addEventListener('scroll', updateProgress))
onUnmounted(() => window.removeEventListener('scroll', updateProgress))
</script>

<style scoped>
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-light));
  z-index: 200;
  transition: width 0.1s linear;
  border-radius: 0 1px 1px 0;
}
</style>
