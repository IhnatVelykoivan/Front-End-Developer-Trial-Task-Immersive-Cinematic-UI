<template>
  <div class="fixed inset-0 -z-10 overflow-hidden opacity-20">
    <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10 animate-pulse"></div>
    <div class="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500/5 rounded-full filter blur-3xl animate-ping-slow"></div>
    <div class="absolute top-1/2 left-1/2 w-1/3 h-1/3 bg-purple-500/5 rounded-full filter blur-3xl animate-ping-slower"></div>
    <div class="absolute bottom-0 right-0 w-1/2 h-1/2 bg-pink-500/5 rounded-full filter blur-3xl animate-ping-slowest"></div>
  </div>
</template>

<script>
export default {
  name: 'AnimatedBackground'
}
</script>

<style>
@keyframes ping-slow {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.2;
  }
}

@keyframes ping-slower {
  0%, 100% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.8);
    opacity: 0.1;
  }
}

@keyframes ping-slowest {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(2);
    opacity: 0.05;
  }
}

.animate-ping-slow {
  animation: ping-slow 8s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-ping-slower {
  animation: ping-slower 12s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-ping-slowest {
  animation: ping-slowest 16s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>