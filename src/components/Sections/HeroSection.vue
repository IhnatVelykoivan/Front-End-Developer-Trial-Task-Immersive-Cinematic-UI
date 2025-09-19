<template>
  <section class="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden section-gradient">
    <div class="absolute inset-0 parallax-bg opacity-30 parallax-layer-1">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-black/90 backdrop-blur-[2px]"></div>
    </div>

    <div class="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center">
      <h1 class="text-6xl md:text-8xl font-bold mb-6 uppercase tracking-tighter leading-none fade-in-up text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 gpu-accelerated">
        ZERO LIMITS
      </h1>
      <div class="max-w-2xl">
        <p class="text-xl md:text-2xl mb-10 opacity-90 fade-in-up gpu-accelerated" style="animation-delay: 0.2s">
          Pushing beyond the boundaries of imagination into uncharted territories of digital experience
        </p>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none">
      <div class="relative h-full">
        <div class="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div class="absolute bottom-0 left-0 w-full flex justify-center items-center pb-16">
          <ScrollIndicator class="fade-in-up transform-gpu" style="animation-delay: 0.4s" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ScrollIndicator from '../UI/ScrollIndicator.vue';

export default {
  name: 'HeroSection',
  components: { ScrollIndicator }
};
</script>

<style scoped>
.fade-in-up {
  opacity: 0;
  transform: translateY(30px) rotateX(-15deg);
  animation: fadeInUp 1.2s forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0) rotateX(0);
  }
}
</style>