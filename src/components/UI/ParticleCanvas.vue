<template>
  <div class="fixed inset-0 -z-10 overflow-hidden">
    <canvas ref="canvas" class="w-full h-full"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { useParticles } from '../../composables/useParticles';

export default {
  name: 'ParticleCanvas',
  setup() {
    const canvas = ref(null);
    const { initParticles, stopParticles } = useParticles(canvas);

    onMounted(() => {
      initParticles();
    });

    onUnmounted(() => {
      stopParticles();
    });

    return { canvas };
  }
};
</script>