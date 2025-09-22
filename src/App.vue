<template>
  <div class="min-h-screen text-white font-sans">
    <!-- Header должен быть поверх всего -->
    <AppHeader />
    
    <!-- Основной контент с правильным overflow -->
    <div class="overflow-hidden">
      <ParticleCanvas />
      <!-- Убираем AnimatedBackground для чистого фона -->

      <main class="relative z-10 w-full max-w-full">
        <div class="w-full mx-auto">
          <!-- Главная секция -->
          <SectionNavigator 
            id="home"
            current-section="home"
            :is-first="true"
            :is-last="true"
            @navigate="handleNavigation('home', $event)"
          >
            <HeroSection class="hero-section" @navigate-to-about="navigateToAbout" />
          </SectionNavigator>

          <!-- О нас секция -->
          <SectionNavigator 
            id="about"
            current-section="about"
            :previous-section-name="'Home'"
            :next-section-name="'Gallery'"
            @navigate="handleNavigation('about', $event)"
          >
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
          </SectionNavigator>

          <!-- Галерея секция -->
          <SectionNavigator 
            id="gallery"
            current-section="gallery"
            :previous-section-name="'About'"
            :next-section-name="'Vision'"
            @navigate="handleNavigation('gallery', $event)"
          >
            <ImageSection
                :imageUrl="'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop'"
                class="parallax-container image-section"
            >
              <div class="central-content max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 secondary-glow-text fade-in-up leading-tight text-center">
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
          </SectionNavigator>

          <!-- Видение секция -->
          <SectionNavigator 
            id="vision"
            current-section="vision"
            :previous-section-name="'Gallery'"
            :next-section-name="'Contact'"
            @navigate="handleNavigation('vision', $event)"
          >
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
          </SectionNavigator>

          <!-- Футер секция -->
          <SectionNavigator 
            id="contact"
            current-section="contact"
            :is-last="true"
            :previous-section-name="'Vision'"
            @navigate="handleNavigation('contact', $event)"
          >
            <AppFooter />
          </SectionNavigator>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ParticleCanvas from './components/UI/ParticleCanvas.vue';
// AnimatedBackground убран для чистого фона
import SectionNavigator from './components/UI/SectionNavigator.vue';
import AppHeader from './components/Layout/AppHeader.vue';
import HeroSection from './components/Sections/HeroSection.vue';
import ContentSection from './components/Sections/ContentSection.vue';
import ImageSection from './components/Sections/ImageSection.vue';
import AppFooter from './components/Layout/AppFooter.vue';
import { useParallax } from './composables/useParallax';
import { usePerformance } from './composables/usePerformance';

export default {
  name: 'App',
  components: {
    ParticleCanvas,
    // AnimatedBackground убран
    SectionNavigator,
    AppHeader,
    HeroSection,
    ContentSection,
    ImageSection,
    AppFooter
  },
  setup() {
    const { initParallax } = useParallax();
    const { optimizeAnimations, performanceMode } = usePerformance();

    const content1 = ref([
      'Where innovation meets imagination, creating experiences that transcend the ordinary and venture into the extraordinary.',
      'We believe in pushing boundaries, breaking barriers, and redefining what\'s possible in digital spaces.'
    ]);

    const content2 = ref([
      'Exploring new dimensions of interaction, we create immersive journeys that captivate and inspire.',
      'Every pixel, every animation, every interaction is meticulously crafted to deliver an unparalleled experience.'
    ]);

    // Порядок секций для навигации
    const sectionOrder = ['home', 'about', 'gallery', 'vision', 'contact'];

    const scrollToSection = (sectionId) => {
      console.log(`🎯 scrollToSection called with: ${sectionId}`);
      
      if (sectionId === 'home') {
        console.log('🏠 Scrolling to home (top)');
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      
      const element = document.getElementById(sectionId);
      if (element) {
        console.log(`✅ Found element for: ${sectionId}`);
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        // Прокручиваем точно к началу секции (10vh для верхней кнопки уже учтены в layout)
        const offsetPosition = elementPosition;
        
        console.log(`📐 Scrolling to position: ${offsetPosition}`);
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        console.log(`❌ Element not found for: ${sectionId}`);
      }
    };

    const getCurrentSection = () => {
      const scrollTop = window.pageYOffset;
      
      // Если близко к верху - всегда home
      if (scrollTop < 200) {
        return 'home';
      }
      
      // Проверяем каждую секцию и находим текущую
      const sections = ['about', 'gallery', 'vision', 'contact'];
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Если секция видна на экране (центр экрана в секции)
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            return sectionId;
          }
        }
      }
      
      return 'home'; // fallback
    };

    const handleNavigation = (currentSection, direction) => {
      // Игнорируем переданный currentSection и определяем реальный
      const realCurrentSection = getCurrentSection();
      console.log(`🎯 Navigation: ${realCurrentSection} → ${direction} (passed: ${currentSection})`);
      
      const currentIndex = sectionOrder.indexOf(realCurrentSection);
      console.log(`📍 Current index: ${currentIndex} (${sectionOrder[currentIndex]})`);
      
      let targetIndex;

      if (direction === 'previous' || direction === 'up') {
        targetIndex = currentIndex - 1;
        console.log(`⬆️ Previous: ${currentIndex} - 1 = ${targetIndex}`);
      } else if (direction === 'next' || direction === 'down') {
        targetIndex = currentIndex + 1;
        console.log(`⬇️ Next: ${currentIndex} + 1 = ${targetIndex}`);
      }

      if (targetIndex >= 0 && targetIndex < sectionOrder.length) {
        const targetSection = sectionOrder[targetIndex];
        console.log(`✅ Going to: ${targetSection} (index ${targetIndex})`);
        scrollToSection(targetSection);
      } else {
        console.log(`❌ Invalid index: ${targetIndex}`);
      }
    };

    onMounted(() => {
      initParallax();
      optimizeAnimations();
      
      // Обработка хеша в URL после полной загрузки компонентов
      setTimeout(() => {
        const hash = window.location.hash;
        if (hash && hash.length > 1) {
          const sectionId = hash.substring(1); // убираем #
          console.log(`🔗 Found hash in URL: ${sectionId}`);
          scrollToSection(sectionId);
        }
      }, 300); // даем время на полную загрузку компонентов
    });

    const navigateToAbout = () => {
      scrollToSection('about');
    };

    return {
      content1,
      content2,
      handleNavigation,
      navigateToAbout
    };
  }
};
</script>

<style>
@import 'assets/styles/App.css';
</style>