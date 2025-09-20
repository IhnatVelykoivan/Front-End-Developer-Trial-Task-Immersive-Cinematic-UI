<template>
  <!-- Header вынесен отдельно для правильной структуры -->
  <AppHeader />
  
  <div class="min-h-screen text-white font-sans overflow-hidden">
    <ParticleCanvas />
    <AnimatedBackground />

    <main class="relative z-10 w-full max-w-full" style="padding-top: 80px;">
      <div class="w-full mx-auto">
        <HeroSection id="home" class="hero-section" />

        <ContentSection
            id="about"
            title="Infinite possibilities"
            :content="content1"
            :floatingContent="[
              {
                title: 'Digital Innovation',
                content: 'Exploring the frontiers of technology to create groundbreaking digital experiences.'
              },
              {
                title: 'Creative Solutions',
                content: 'Transforming ideas into reality through innovative design and development.'
              },
              {
                title: 'User Experience',
                content: 'Crafting seamless and engaging interactions that delight and inspire users.'
              }
            ]"
            class="parallax-container"
            direction="right"
        />

        <ImageSection
            id="gallery"
            :imageUrl="'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop'"
            class="parallax-container image-section"
        >
          <div class="central-content max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 secondary-glow-text fade-in-up leading-tight text-center">
              Digital Frontiers
            </h2>
            <div class="max-w-3xl mx-auto space-y-6 text-center">
              <p class="text-lg md:text-xl lg:text-2xl opacity-90 fade-in-up leading-relaxed">
                Where technology meets imagination, creating immersive experiences that push the boundaries of reality
              </p>
              <div class="w-24 h-0.5 secondary-gradient-line mx-auto mt-6 rounded-full fade-in-up"></div>
            </div>
          </div>
        </ImageSection>

        <ContentSection
            id="vision"
            title="Vision & Innovation"
            :content="content1"
            :floatingContent="[
              {
                title: 'Breaking Boundaries',
                content: 'Pushing the limits of what\'s possible in digital experiences through innovative thinking and creative solutions.'
              },
              {
                title: 'Future Forward',
                content: 'Embracing cutting-edge technologies to create immersive and engaging user experiences.'
              },
              {
                title: 'Creative Excellence',
                content: 'Combining artistic vision with technical expertise to deliver extraordinary digital experiences.'
              }
            ]"
            class="parallax-container"
            direction="left"
        />

        <AppFooter id="contact" />
      </div>
    </main>
  </div>

  <!-- Кнопка прокрутки вверх - вынесена на глобальный уровень -->
  <ScrollToTop />
</template>

<script>
import { ref, onMounted } from 'vue';
import ParticleCanvas from './components/UI/ParticleCanvas.vue';
import AnimatedBackground from './components/UI/AnimatedBackground.vue';
import ScrollToTop from './components/UI/ScrollToTop.vue';
import AppHeader from './components/Layout/AppHeader.vue';
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
    ScrollToTop,
    AppHeader,
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
@import 'assets/styles/App.css';
</style>