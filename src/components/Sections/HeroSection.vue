<template>
  <section id="home" class="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden" style="padding-top: 80px;">
    <div class="absolute inset-0 parallax-bg opacity-30 parallax-layer-1">
      <!-- Убираем градиентный overlay -->
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
          
          <!-- Кнопка навигации к About секции -->
          <div class="flex justify-center mb-8 fade-in-up" style="animation-delay: 0.3s">
            <button 
              @click="navigateToAbout"
              class="hero-explore-btn group relative overflow-hidden"
            >
              <span class="relative z-10 flex items-center gap-3">
                Explore Journey
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
          
          <div class="w-40 h-1 hero-gradient-line mx-auto mt-8 rounded-full fade-in-up" style="animation-delay: 0.4s"></div>
        </div>
      </div>
    </div>

    <!-- Убираем нижний градиент -->
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  emits: ['navigate-to-about'],
  setup(props, { emit }) {
    const navigateToAbout = () => {
      emit('navigate-to-about');
    };

    return {
      navigateToAbout
    };
  }
};
</script>

<style scoped>
@import url('../../assets/styles/HeroSection.css');
</style>