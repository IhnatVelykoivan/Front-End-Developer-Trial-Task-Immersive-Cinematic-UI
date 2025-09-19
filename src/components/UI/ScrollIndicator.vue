<template>
  <div class="flex flex-col items-center gap-3 relative transform-gpu">
    <div class="w-px h-12 bg-gradient-to-b from-white to-transparent animate-pulse-slow"></div>
    <div class="text-sm uppercase tracking-widest text-white/80 font-light relative select-none backdrop-blur-[1px] px-2">
      <span class="relative z-10">Scroll to explore</span>
      <div class="absolute inset-0 bg-black/10 blur-sm"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScrollIndicator'
}
</script>

<style scoped>
.animate-pulse-slow {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.9; }
  50% { opacity: 0.5; }
}
</style>