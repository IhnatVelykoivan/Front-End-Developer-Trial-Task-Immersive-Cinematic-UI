<template>
  <div class="min-h-screen text-white font-sans overflow-x-hidden">
    <ParticleCanvas />
    <AnimatedBackground />

    <main class="relative z-10">
      <HeroSection />

      <ContentSection
          title="Infinite possibilities"
          :content="content1"
          class="parallax-container"
      />

      <ImageSection
          image-url="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
          class="parallax-container"
      />

      <ContentSection
          title="Beyond the horizon"
          :content="content2"
          class="parallax-container"
      />

      <AppFooter />
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ParticleCanvas from './components/UI/ParticleCanvas.vue';
import AnimatedBackground from './components/UI/AnimatedBackground.vue';
import HeroSection from './components/Sections/HeroSection.vue';
import ContentSection from './components/Sections/ContentSection.vue';
import ImageSection from './components/Sections/ImageSection.vue';
import AppFooter from './components/Layout/AppFooter.vue';
import { useParallax } from './composables/useParallax';

export default {
  name: 'App',
  components: {
    ParticleCanvas,
    AnimatedBackground,
    HeroSection,
    ContentSection,
    ImageSection,
    AppFooter
  },
  setup() {
    const { initParallax } = useParallax();

    const content1 = ref([
      'Where innovation meets imagination, creating experiences that transcend the ordinary and venture into the extraordinary.',
      'We believe in pushing boundaries, breaking barriers, and redefining what\'s possible in digital spaces.'
    ]);

    const content2 = ref([
      'Exploring new dimensions of interaction, we create immersive journeys that captivate and inspire.',
      'Every pixel, every animation, every interaction is meticulously crafted to deliver an unparalleled experience.'
    ]);

    onMounted(() => {
      initParallax();
    });

    return {
      content1,
      content2
    };
  }
};
</script>

<style>
@import './assets/styles/main.css';
</style>