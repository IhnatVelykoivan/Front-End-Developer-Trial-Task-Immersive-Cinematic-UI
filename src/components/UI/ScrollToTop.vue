<template>
  <Transition name="scroll-to-top">
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="scroll-to-top-btn"
      aria-label="Scroll to top"
    >
      <div class="btn-content">
        <svg
          class="arrow-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m18 15-6-6-6 6"/>
        </svg>
        <div class="progress-ring">
          <svg class="progress-circle" width="56" height="56">
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="rgba(96, 165, 250, 0.2)"
              stroke-width="2"
              fill="none"
            />
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="url(#progressGradient)"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="progressOffset"
              transform="rotate(-90 28 28)"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#60a5fa"/>
                <stop offset="50%" style="stop-color:#a78bfa"/>
                <stop offset="100%" style="stop-color:#f472b6"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </button>
  </Transition>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue'

export default {
  name: 'ScrollToTop',
  setup() {
    const isVisible = ref(false)
    const scrollProgress = ref(0)
    const radius = 24
    const circumference = 2 * Math.PI * radius

    const progressOffset = computed(() => {
      return circumference - (scrollProgress.value / 100) * circumference
    })

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      
      // Простая логика - показываем кнопку после прокрутки на 200px
      isVisible.value = scrollTop > 200
      
      // Вычисляем прогресс прокрутки
      if (docHeight > 0) {
        scrollProgress.value = Math.max(0, Math.min(100, (scrollTop / docHeight) * 100))
      }
    }

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    onMounted(() => {
      // Используем passive listeners для лучшей производительности
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Первоначальная проверка
    })

    onUnmounted(() => {
      // Убираем event listener
      window.removeEventListener('scroll', handleScroll);
      
      // Очищаем все возможные анимации
      if (isVisible.value) {
        // Останавливаем любые активные CSS анимации
        const btn = document.querySelector('.scroll-to-top-btn');
        if (btn) {
          btn.style.animation = 'none';
        }
      }
    })

    return {
      isVisible,
      scrollProgress,
      circumference,
      progressOffset,
      scrollToTop
    }
  }
}
</script>

<style scoped>
.scroll-to-top-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 9999;
  width: 3.5rem;
  height: 3.5rem;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  will-change: transform, box-shadow;
}

.scroll-to-top-btn:hover {
  transform: translateY(-4px) scale(1.05);
  background: rgba(0, 0, 0, 0.9);
  border-color: rgba(96, 165, 250, 0.3);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(96, 165, 250, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}

.btn-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-icon {
  color: #ffffff;
  transition: all 0.3s ease;
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.3));
  z-index: 2;
  position: relative;
}

.scroll-to-top-btn:hover .arrow-icon {
  color: #60a5fa;
  transform: translateY(-2px);
  filter: drop-shadow(0 0 8px rgba(96, 165, 250, 0.6));
}

.progress-ring {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  pointer-events: none;
}

.progress-circle {
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
}

/* Анимации появления/исчезновения */
.scroll-to-top-enter-active,
.scroll-to-top-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.scroll-to-top-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.scroll-to-top-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

/* Адаптивные стили */
@media (max-width: 768px) {
  .scroll-to-top-btn {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 3rem;
    height: 3rem;
  }
  
  .arrow-icon {
    width: 18px;
    height: 18px;
  }
  
  .progress-ring svg {
    width: 48px;
    height: 48px;
  }
}

@media (max-width: 480px) {
  .scroll-to-top-btn {
    bottom: 1rem;
    right: 1rem;
    width: 2.75rem;
    height: 2.75rem;
  }
  
  .arrow-icon {
    width: 16px;
    height: 16px;
  }
  
  .progress-ring svg {
    width: 44px;
    height: 44px;
  }
  
  .scroll-to-top-btn:hover {
    transform: translateY(-2px) scale(1.02);
  }
}

/* Анимация пульсации */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  }
  50% {
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 0 20px rgba(96, 165, 250, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  }
}

.scroll-to-top-btn {
  animation: pulse-glow 3s ease-in-out infinite;
}
</style>
