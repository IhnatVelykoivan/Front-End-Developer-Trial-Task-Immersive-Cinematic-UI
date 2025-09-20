<template>
  <section id="home" class="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden section-gradient">
    <div class="absolute inset-0 parallax-bg opacity-30 parallax-layer-1">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-black/90 backdrop-blur-[2px]"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div class="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
        <h1 class="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-8 uppercase tracking-tighter leading-none fade-in-up main-glow-text gpu-accelerated">
          ZERO LIMITS
        </h1>
        <div class="max-w-4xl mx-auto space-y-6">
          <p class="text-xl md:text-2xl lg:text-3xl mb-10 opacity-90 fade-in-up gpu-accelerated leading-relaxed" style="animation-delay: 0.2s">
            Pushing beyond the boundaries of imagination into uncharted territories of digital experience
          </p>
          <div class="w-40 h-1 hero-gradient-line mx-auto mt-8 rounded-full fade-in-up" style="animation-delay: 0.4s"></div>
        </div>
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
@import url('../../assets/styles/HeroSection.css');
</style>