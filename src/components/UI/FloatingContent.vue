<template>
  <div 
    class="floating-content relative transform-gpu"
    :class="[
      position,
      { 'visible': isVisible }
    ]"
    ref="contentRef"
  >
    <div 
      class="content-wrapper backdrop-blur-sm bg-white/5 rounded-lg p-6 shadow-2xl border border-white/10 cursor-pointer"
      ref="wrapperRef"
      @mouseenter="handleHover(true)"
      @mouseleave="handleHover(false)"
    >
      <div class="relative z-10">
        <slot></slot>
      </div>
      <div class="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-all duration-300 rounded-lg hover-gradient"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'FloatingContent',
  props: {
    position: {
      type: String,
      default: 'left',
      validator: (value) => ['left', 'center', 'right'].includes(value)
    },
    delay: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const contentRef = ref(null);
    const wrapperRef = ref(null);
    const isVisible = ref(false);
    const offset = ref({ x: 0, y: 0 });
    const scale = ref(1);
    let animation;
    let hoverAnimation;

    const initFloating = () => {
      if (!contentRef.value) return;

      // Устанавливаем начальное скрытое состояние для wrapper
      if (wrapperRef.value) {
        gsap.set(wrapperRef.value, {
          y: 50,
          opacity: 0,
          scale: 0.95
        });
      }

      const trigger = ScrollTrigger.create({
        trigger: contentRef.value,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          isVisible.value = true;
          
          // Добавляем класс visible к самому элементу
          contentRef.value.classList.add('visible');
          
          const initialY = 50;
          const initialScale = 0.95;
          
          // Анимируем wrapper элемент
          if (wrapperRef.value) {
            gsap.fromTo(wrapperRef.value, 
              {
                y: initialY,
                opacity: 0,
                scale: initialScale
              },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                onComplete: () => {
                  // Запускаем floating ПОСЛЕ завершения входной анимации
                  startFloatingAnimation();
                }
              }
            );
          }
        },
        onLeave: () => {
          isVisible.value = false;
          
          if (animation) {
            animation.kill();
            animation = null;
          }
          
          contentRef.value.classList.remove('visible');
          
          if (wrapperRef.value) {
            gsap.to(wrapperRef.value, {
              y: 50,
              opacity: 0,
              scale: 0.95,
              duration: 0.6,
              ease: "power2.in"
            });
          }
        },
        onEnterBack: () => {
          isVisible.value = true;
          
          contentRef.value.classList.add('visible');
          
          if (wrapperRef.value) {
            gsap.to(wrapperRef.value, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
              onComplete: () => {
                // Запускаем floating ПОСЛЕ завершения входной анимации
                startFloatingAnimation();
              }
            });
          }
        },
        onLeaveBack: () => {
          isVisible.value = false;
          
          if (animation) {
            animation.kill();
            animation = null;
          }
          
          contentRef.value.classList.remove('visible');
          
          if (wrapperRef.value) {
            gsap.to(wrapperRef.value, {
              y: -50,
              opacity: 0,
              scale: 0.95,
              duration: 0.6,
              ease: "power2.in"
            });
          }
        }
      });

      // Проверяем сразу после создания триггера, если элемент уже в видимости
      setTimeout(() => {
        trigger.refresh(); // Обновляем триггер
        if (trigger.isActive) {
          // Если элемент уже в зоне видимости, показываем его
          isVisible.value = true;
          contentRef.value.classList.add('visible');
          
          if (wrapperRef.value) {
            gsap.to(wrapperRef.value, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
              onComplete: () => {
                startFloatingAnimation();
              }
            });
          }
        }
      }, 100);

      return () => trigger.kill();
    };

    const startFloatingAnimation = () => {
      // Убиваем предыдущую анимацию если она есть
      if (animation) {
        animation.kill();
        animation = null;
      }
      
      if (!wrapperRef.value) return;

      const direction = props.position === 'left' ? 1 : props.position === 'right' ? -1 : 0;
      // Простая и надежная анимация
      const amplitude = 3; // Очень маленькое движение
      const duration = 4; // Разумная скорость

      // Плавная циклическая анимация без разрывов
      animation = gsap.timeline({
        repeat: -1,
        yoyo: true, // Автоматический плавный возврат
        ease: "sine.inOut" // Мягкий синусоидальный easing
      });

      animation.to(wrapperRef.value, {
        x: amplitude * direction,
        y: -amplitude * 0.3,
        duration: duration / 2,
        ease: "sine.inOut", // Плавный переход
        force3D: true
      });
    };

    onMounted(() => {
      const cleanup = initFloating();
      
      // Cleanup при unmount
      onUnmounted(() => {
        cleanup?.();
        if (animation) {
          animation.kill();
          animation = null;
        }
        if (hoverAnimation) {
          hoverAnimation.kill();
          hoverAnimation = null;
        }
        
        // Cleanup всех ScrollTrigger связанных с этим элементом
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === contentRef.value || 
              trigger.trigger === contentRef.value?.closest('.floating-cards-wrapper')) {
            trigger.kill();
          }
        });
      });
    });

    const handleHover = (isHovering) => {
      if (hoverAnimation) {
        hoverAnimation.kill();
        hoverAnimation = null;
      }
      
      if (!isVisible.value || !wrapperRef.value) return;
      
      // Простой и надежный hover эффект
      hoverAnimation = gsap.to(wrapperRef.value, {
        duration: 0.3,
        scale: isHovering ? 1.02 : 1,
        ease: "power2.out",
        force3D: true
      });

      // Add hover effect to the gradient
      const gradient = contentRef.value?.querySelector('.hover-gradient');
      if (gradient) {
        gsap.to(gradient, {
          duration: 0.3,
          opacity: isHovering ? 0.2 : 0,
          ease: "power2.out"
        });
      }
    };

    return {
      contentRef,
      wrapperRef,
      isVisible,
      offset,
      scale,
      handleHover
    };
  }
};
</script>

<style scoped>
@import "../../assets/styles/FloatingContent.css";
</style>
