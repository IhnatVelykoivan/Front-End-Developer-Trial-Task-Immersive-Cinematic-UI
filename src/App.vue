<template>
  <div class="min-h-screen text-white font-sans overflow-x-hidden">
    <ParticleCanvas />
    <AnimatedBackground />

    <main class="relative z-10">
      <HeroSection />

      <ContentSection
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
          :imageUrl="'/images/cyberpunk-city.jpg'"
          class="parallax-container"
      >
        <div class="text-center">
          <h2 class="text-4xl md:text-5xl font-bold mb-6 glow-text fade-in-up">Digital Frontiers</h2>
          <p class="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto fade-in-up">
            Where technology meets imagination, creating immersive experiences that push the boundaries of reality
          </p>
        </div>
      </ImageSection>

                                    <ContentSection
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
@import 'assets/styles/App.css';
</style>