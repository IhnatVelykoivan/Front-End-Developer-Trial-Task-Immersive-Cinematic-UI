<template>
  <header class="fixed top-0 left-0 right-0 z-50 cinematic-nav" :class="{ 'nav-scrolled': isScrolled }">
    <!-- Индикатор прогресса скролла -->
    <div class="scroll-progress-bar" :style="{ width: scrollProgress + '%' }"></div>
    
    <nav class="w-full max-w-none px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex items-center justify-between w-full">
        <!-- Улучшенный логотип -->
        <div class="logo-container flex-shrink-0">
          <a href="#home" @click="scrollToSection('home')" class="logo-link group">
            <div class="logo-icon">
              <div class="logo-rings">
                <div class="ring ring-1"></div>
                <div class="ring ring-2"></div>
                <div class="ring ring-3"></div>
              </div>
              <div class="logo-center">Z</div>
            </div>
            <div class="logo-text-container">
              <span class="logo-text">ZERO</span>
              <span class="logo-accent">LIMITS</span>
            </div>
          </a>
        </div>

        <!-- Профессиональная десктопная навигация -->
        <div class="hidden lg:flex items-center justify-center flex-1 mx-8">
          <nav class="flex items-center space-x-1">
            <nav-link 
              v-for="item in navItems" 
              :key="item.id"
              :href="item.href"
              :label="item.label"
              :is-active="activeSection === item.id"
              @click="() => scrollToSection(item.id)"
            />
          </nav>
        </div>
        
        <!-- CTA кнопка -->
        <div class="hidden lg:flex items-center flex-shrink-0">
          <button class="cta-button group">
            <span class="cta-text">Get Started</span>
            <svg class="cta-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L15 8L8 15M15 8H1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- Улучшенная мобильная кнопка меню -->
        <button 
          @click="toggleMobileMenu"
          class="lg:hidden mobile-menu-btn flex-shrink-0"
          :class="{ 'menu-open': isMobileMenuOpen }"
          aria-label="Toggle menu"
        >
          <div class="menu-icon">
            <span class="menu-line menu-line-1"></span>
            <span class="menu-line menu-line-2"></span>
            <span class="menu-line menu-line-3"></span>
          </div>
        </button>
      </div>
    </nav>

    <!-- Профессиональное мобильное меню -->
    <div class="mobile-menu" :class="{ 'menu-active': isMobileMenuOpen }">
      <div class="mobile-menu-backdrop" @click="toggleMobileMenu"></div>
      <div class="mobile-menu-content">
        <div class="mobile-menu-header">
          <div class="mobile-logo">
            <div class="logo-icon small">
              <div class="logo-rings">
                <div class="ring ring-1"></div>
                <div class="ring ring-2"></div>
              </div>
              <div class="logo-center">Z</div>
            </div>
            <span class="mobile-logo-text">ZERO LIMITS</span>
          </div>
        </div>
        
        <nav class="mobile-nav">
          <nav-link 
            v-for="(item, index) in navItems" 
            :key="'mobile-' + item.id"
            :href="item.href"
            :label="item.label"
            :is-active="activeSection === item.id"
            :is-mobile="true"
            :style="{ animationDelay: (index * 0.1) + 's' }"
            @click="handleMobileNavClick(item.id)"
          />
        </nav>
        
        <div class="mobile-menu-footer">
          <button class="mobile-cta-button">
            <span>Get Started</span>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L15 8L8 15M15 8H1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import NavLink from '../UI/NavLink.vue'

export default {
  name: 'AppHeader',
  components: {
    NavLink
  },
  setup() {
    const isScrolled = ref(false)
    const isMobileMenuOpen = ref(false)
    const activeSection = ref('home')
    const scrollProgress = ref(0)

    const navItems = [
      { id: 'home', label: 'Home', href: '#home' },
      { id: 'about', label: 'Experience', href: '#about' },
      { id: 'gallery', label: 'Gallery', href: '#gallery' },
      { id: 'vision', label: 'Vision', href: '#vision' },
      { id: 'contact', label: 'Contact', href: '#contact' }
    ]

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      
      isScrolled.value = scrollTop > 100
      scrollProgress.value = (scrollTop / docHeight) * 100
      
      // Улучшенное определение активной секции
      const sections = document.querySelectorAll('section[id], [id]')
      const headerOffset = 100 // Отступ для фиксированной навигации
      
      let currentSection = 'home'
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - headerOffset
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute('id')
        
        if (sectionId && scrollTop >= sectionTop - 100 && scrollTop < sectionTop + sectionHeight - 100) {
          currentSection = sectionId
        }
      })
      
      activeSection.value = currentSection
    }

    const scrollToSection = (sectionId) => {
      console.log('Прокрутка к секции:', sectionId)
      
      if (sectionId === 'home') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        activeSection.value = 'home'
        return
      }
      
      const element = document.getElementById(sectionId)
      console.log('Найденный элемент:', element)
      
      if (element) {
        const headerHeight = 80 // Высота фиксированной навигации
        const rect = element.getBoundingClientRect()
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const elementTop = rect.top + scrollTop
        const offsetTop = elementTop - headerHeight
        
        console.log('Элемент находится на позиции:', elementTop)
        console.log('Прокрутка к позиции с учетом хедера:', offsetTop)
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        })
        
        // Обновляем активную секцию
        activeSection.value = sectionId
        
        // Закрываем мобильное меню если оно открыто
        if (isMobileMenuOpen.value) {
          isMobileMenuOpen.value = false
        }
      } else {
        console.error('Секция не найдена:', sectionId)
      }
    }

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value
    }

    const handleMobileNavClick = (sectionId) => {
      scrollToSection(sectionId)
      isMobileMenuOpen.value = false
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll() // Первоначальная проверка
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      isScrolled,
      isMobileMenuOpen,
      activeSection,
      scrollProgress,
      navItems,
      scrollToSection,
      toggleMobileMenu,
      handleMobileNavClick
    }
  }
}
</script>

<style scoped>
@import url('../../assets/styles/AppHeader.css');
</style>