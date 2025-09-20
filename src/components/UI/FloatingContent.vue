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
      :style="{
        transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
      }"
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
    const isVisible = ref(false);
    const offset = ref({ x: 0, y: 0 });
    const scale = ref(1);
    let animation;
    let hoverAnimation;

    const initFloating = () => {
      if (!contentRef.value) return;

      const trigger = ScrollTrigger.create({
        trigger: contentRef.value.closest('.floating-cards-wrapper'),
        start: "top bottom",
        end: "bottom top",
        toggleActions: "play none none reverse",
        onEnter: () => {
          isVisible.value = true;
          startFloatingAnimation();
          
          if (contentRef.value.parentElement) {
            contentRef.value.parentElement.classList.add('visible');
            
            const initialY = 50;
            const initialScale = 0.95;
            
            gsap.fromTo(contentRef.value.parentElement, 
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
                clearProps: "all"
              }
            );
          }
        },
        onLeave: () => {
          isVisible.value = false;
          if (animation) animation.kill();
          
          if (contentRef.value.parentElement) {
            gsap.to(contentRef.value.parentElement, {
              y: 50,
              opacity: 0,
              scale: 0.95,
              duration: 0.6,
              ease: "power2.in",
              onComplete: () => {
                contentRef.value.parentElement.classList.remove('visible');
              }
            });
          }
        },
        onEnterBack: () => {
          isVisible.value = true;
          startFloatingAnimation();
          
          if (contentRef.value.parentElement) {
            contentRef.value.parentElement.classList.add('visible');
            
            gsap.to(contentRef.value.parentElement, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
              clearProps: "all"
            });
          }
        },
        onLeaveBack: () => {
          isVisible.value = false;
          if (animation) animation.kill();
          
          if (contentRef.value.parentElement) {
            gsap.to(contentRef.value.parentElement, {
              y: -50,
              opacity: 0,
              scale: 0.95,
              duration: 0.6,
              ease: "power2.in",
              onComplete: () => {
                contentRef.value.parentElement.classList.remove('visible');
              }
            });
          }
        }
      });

      return () => trigger.kill();
    };

    const startFloatingAnimation = () => {
      if (animation) animation.kill();

      const direction = props.position === 'left' ? 1 : props.position === 'right' ? -1 : 0;
      const amplitude = 15;
      const duration = 3;

      animation = gsap.timeline({
        repeat: -1,
        defaults: { duration: duration, ease: "sine.inOut" }
      });

      // Синхронизированная анимация для всех карточек
      animation
        .to(offset.value, {
          x: amplitude * direction,
          y: -amplitude,
          duration: duration / 2,
        })
        .to(offset.value, {
          x: 0,
          y: 0,
          duration: duration / 2,
        });
    };

    onMounted(() => {
      const cleanup = initFloating();
      return () => {
        cleanup?.();
        if (animation) animation.kill();
      };
    });

    const handleHover = (isHovering) => {
      if (hoverAnimation) {
        hoverAnimation.kill();
        hoverAnimation = null;
      }
      
      if (!isVisible.value) return;
      
      hoverAnimation = gsap.to(scale, {
        duration: 0.3,
        value: isHovering ? 1.05 : 1,
        ease: "power2.out",
        overwrite: true
      });

      // Add hover effect to the gradient
      const gradient = contentRef.value?.querySelector('.hover-gradient');
      if (gradient) {
        gsap.to(gradient, {
          duration: 0.3,
          opacity: isHovering ? 0.2 : 0,
          ease: "power2.out",
          overwrite: true
        });
      }
    };

    return {
      contentRef,
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
