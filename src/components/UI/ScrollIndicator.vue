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
@import '../../assets/styles/ScrollIndicator.css';
</style>