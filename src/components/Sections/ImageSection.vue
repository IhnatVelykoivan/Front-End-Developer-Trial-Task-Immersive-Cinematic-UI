<template>
  <div class="w-full h-screen relative overflow-hidden parallax-container section-gradient">
    <!-- Основное изображение с параллакс эффектом -->
    <div
      class="absolute inset-0 bg-cover bg-center scale-in transform-gpu"
      :style="{ backgroundImage: 'url(' + imageUrl + ')' }"
    >
      <!-- Интерактивный градиентный оверлей -->
      <div class="absolute inset-0 mix-blend-overlay opacity-50 bg-gradient-conic from-blue-500/30 via-purple-500/30 to-pink-500/30"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50"></div>
      
      <!-- Дополнительные визуальные эффекты -->
      <div class="absolute inset-0">
        <!-- Верхний слой с размытием -->
        <div class="absolute top-0 w-full h-1/3 bg-gradient-to-b from-black/60 to-transparent parallax-layer-1"></div>
        
        <!-- Нижний слой с размытием -->
        <div class="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent parallax-layer-1"></div>
        
        <!-- Боковые градиенты -->
        <div class="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black/40 to-transparent parallax-layer-2"></div>
        <div class="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black/40 to-transparent parallax-layer-2"></div>
      </div>

      <!-- Дополнительные декоративные элементы -->
      <div class="absolute inset-0 pointer-events-none">
        <!-- Сетка линий -->
        <div class="absolute inset-0 opacity-10 bg-grid-pattern"></div>
        
        <!-- Светящиеся точки -->
        <div class="absolute inset-0">
          <div class="glow-point absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full animate-pulse-slow"></div>
          <div class="glow-point absolute top-3/4 right-1/4 w-2 h-2 bg-purple-500 rounded-full animate-pulse-medium"></div>
          <div class="glow-point absolute top-1/2 left-1/2 w-2 h-2 bg-pink-500 rounded-full animate-pulse-fast"></div>
        </div>
      </div>
    </div>

    <!-- Контент секции -->
    <div class="relative z-10 w-full h-full flex items-center justify-center px-4">
      <FloatingContent position="left">
        <div class="space-y-4">
          <h3 class="text-2xl font-semibold text-white/90">Visual Excellence</h3>
          <p class="text-white/70">Crafting stunning visual experiences that captivate and inspire.</p>
        </div>
      </FloatingContent>

      <slot></slot>

      <FloatingContent position="right">
        <div class="space-y-4">
          <h3 class="text-2xl font-semibold text-white/90">Artistic Vision</h3>
          <p class="text-white/70">Where technology meets artistry to create unforgettable moments.</p>
        </div>
      </FloatingContent>
    </div>
  </div>
</template>

<script>
import FloatingContent from '../UI/FloatingContent.vue';

export default {
  name: 'ImageSection',
  components: {
    FloatingContent
  },
  props: {
    imageUrl: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
@import url('../../assets/styles/ImageSection.css');
</style>