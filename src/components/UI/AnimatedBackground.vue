<template>
  <div class="fixed inset-0 -z-10 overflow-hidden">
    <!-- Основной градиент -->
    <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/5 via-purple-900/10 to-indigo-900/15 animate-gradient"></div>
    
    <!-- Динамические элементы -->
    <div class="absolute inset-0">
      <!-- Верхний слой с размытием -->
      <div class="absolute top-0 left-1/4 w-1/2 h-1/2 bg-cyan-500/5 rounded-full filter blur-[100px] animate-float-slow transform-gpu"></div>
      
      <!-- Средний слой -->
      <div class="absolute top-1/3 right-1/4 w-2/3 h-2/3 bg-blue-600/5 rounded-full filter blur-[120px] animate-float-medium transform-gpu"></div>
      
      <!-- Нижний слой -->
      <div class="absolute bottom-1/4 left-1/3 w-1/3 h-1/3 bg-purple-500/5 rounded-full filter blur-[80px] animate-float-fast transform-gpu"></div>
      
      <!-- Дополнительные эффекты -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40 animate-pulse-slow"></div>
    </div>

    <!-- Интерактивный слой свечения -->
    <div class="absolute inset-0 bg-gradient-radial from-blue-500/5 to-transparent opacity-50 animate-glow transform-gpu"></div>
  </div>
</template>

<script>
export default {
  name: 'AnimatedBackground'
}
</script>

<style>
@import url('../../assets/styles/AnimatedBackground.css');
</style>