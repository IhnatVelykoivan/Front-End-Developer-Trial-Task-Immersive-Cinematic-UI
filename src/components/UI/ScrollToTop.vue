<template>
  <button
    v-if="isVisible"
    @click="scrollToTop"
    class="scroll-to-top-btn"
  >
    ↑
  </button>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'ScrollToTop',
  setup() {
    const isVisible = ref(false)

    const handleScroll = () => {
      // Ищем секцию #about (вторая секция)
      const aboutSection = document.getElementById('about')
      
      if (aboutSection) {
        const aboutTop = aboutSection.offsetTop
        const scrollTop = window.pageYOffset
        
        // Показываем кнопку, когда доскроллили до секции #about
        isVisible.value = scrollTop >= aboutTop - 100 // небольшой отступ
      } else {
        // fallback на пиксели, если секция не найдена
        isVisible.value = scrollTop > 300
      }
    }

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      
      // Проверяем сразу после загрузки страницы
      setTimeout(() => {
        handleScroll()
      }, 100)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return { isVisible, scrollToTop }
  }
}
</script>

<style scoped>
.scroll-to-top-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 99999;
  width: 3rem;
  height: 3rem;
  background: rgba(15, 23, 42, 0.95);
  color: white;
  border: 2px solid rgba(96, 165, 250, 0.3);
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.scroll-to-top-btn:hover {
  background: rgba(15, 23, 42, 1);
  border-color: rgba(96, 165, 250, 0.6);
  transform: scale(1.1);
}
</style>
