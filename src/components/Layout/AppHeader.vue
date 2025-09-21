<template>
  <header 
    class="fixed top-0 left-0 right-0 cinematic-nav" 
    :class="{ 'nav-scrolled': isScrolled }" 
    style="z-index: 1001 !important; visibility: visible !important; opacity: 1 !important;"
  >
    <!-- Индикатор прогресса скролла -->
    <div class="scroll-progress-bar" :style="{ width: scrollProgress + '%' }"></div>
    
    <nav class="w-full max-w-none px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between w-full h-20">
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
      
      isScrolled.value = scrollTop > 50
      scrollProgress.value = (scrollTop / docHeight) * 100
      
      // Простая логика определения активной секции
      let currentSection = 'home'
      
      // Если близко к верху - всегда home
      if (scrollTop < 200) {
        currentSection = 'home'
      } else {
        // Проверяем каждую секцию и находим ближайшую
        const sections = ['about', 'gallery', 'vision', 'contact']
        
        for (const sectionId of sections) {
          const element = document.getElementById(sectionId)
          if (element) {
            const rect = element.getBoundingClientRect()
            // Если секция видна на экране (хотя бы частично)
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
              currentSection = sectionId
              break
            }
          }
        }
      }
      
      // Обновляем активную секцию
      if (activeSection.value !== currentSection) {
        activeSection.value = currentSection
      }
    }

    const scrollToSection = (sectionId) => {
      console.log('🎯 Header navigation to section:', sectionId)
      
      if (sectionId === 'home') {
        // Для главной секции - просто в самый верх
        console.log('📍 Scrolling to top (0)')
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        activeSection.value = 'home'
        return
      }
      
      // Для всех остальных секций используем ту же логику что и в App.vue
      const element = document.getElementById(sectionId)
      if (element) {
        console.log('🔍 Found element:', sectionId)
        
        // Получаем позицию элемента и прокручиваем точно к началу
        // (без offset, так как SectionNavigator уже учитывает верхнюю кнопку 10vh)
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        
        console.log('📐 Scrolling to position:', elementPosition)
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        })
        
        activeSection.value = sectionId
        
        // Закрываем мобильное меню если открыто
        if (isMobileMenuOpen.value) {
          isMobileMenuOpen.value = false
        }
      } else {
        console.error('❌ Секция не найдена:', sectionId)
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