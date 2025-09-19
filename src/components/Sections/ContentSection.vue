<template>
  <section class="min-h-screen flex flex-col items-center justify-center py-20 relative overflow-hidden section-gradient">
    <div class="absolute inset-0 opacity-10 parallax-layer-1">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10"></div>
    </div>

    <div class="text-block max-w-3xl mx-auto px-5% stagger-text relative z-10">
      <h2 class="text-4xl md:text-5xl font-bold mb-8 fade-in-up">{{ title }}</h2>
      <p v-for="(paragraph, index) in content" :key="index" class="text-xl md:text-2xl opacity-90 mb-6 leading-relaxed">
        {{ paragraph }}
      </p>
    </div>

    <div class="floating-cards-wrapper w-full"
      :class="{ 'direction-right': direction === 'right' }"
    >
      <div class="floating-cards-grid">
        <div class="floating-card" v-for="(card, index) in floatingContent" :key="index"
          :class="[
            `card-${index}`,
            direction === 'right' ? 'from-right' : 'from-left'
          ]"
        >
          <FloatingContent :position="index === 1 ? 'center' : direction">
            <div class="space-y-4">
              <h3 class="text-2xl font-semibold text-white/90">{{ card.title }}</h3>
              <p class="text-white/70">{{ card.content }}</p>
            </div>
          </FloatingContent>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FloatingContent from '../UI/FloatingContent.vue';

export default {
  name: 'ContentSection',
  components: {
    FloatingContent
  },
  props: {
    title: String,
    content: Array,
    floatingContent: {
      type: Array,
      default: () => []
    },
    direction: {
      type: String,
      default: 'left'
    }
  },
  mounted() {
    // Создаем IntersectionObserver для отслеживания видимости секции
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Если секция видима, добавляем класс visible всем карточкам
          entry.target.querySelectorAll('.floating-card').forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('visible');
            }, index * 100); // Небольшая задержка между карточками
          });
        }
      });
    }, {
      threshold: 0.2 // Триггер когда 20% секции видимо
    });

    // Начинаем наблюдение за секцией
    observer.observe(this.$el);
  }
}
</script>

<style scoped>
.px-5\% {
  padding-left: 5%;
  padding-right: 5%;
}

.floating-cards-wrapper {
  position: relative;
  width: 100%;
  min-height: 400px;
  margin-top: 4rem;
  pointer-events: none;
}

.floating-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2.5rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 max(5%, 2rem);
}

.floating-card {
  pointer-events: auto;
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  will-change: transform, opacity;
  visibility: hidden;
}

.floating-card.visible {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
}

.direction-right .floating-card {
  transform: translateY(50px);
}

.card-0 { 
  transform: translate(-50px, 30px);
  transition-delay: 0s;
}

.card-1 { 
  transform: translate(0, 50px);
  transition-delay: 0.1s;
}

.card-2 { 
  transform: translate(50px, 30px);
  transition-delay: 0.2s;
}

.direction-right .card-0 { 
  transform: translate(50px, 30px);
}

.direction-right .card-1 { 
  transform: translate(0, 50px);
}

.direction-right .card-2 { 
  transform: translate(-50px, 30px);
}

.floating-card.visible {
  opacity: 1;
  transform: translate(0, 0) !important;
}

@media (max-width: 1024px) {
  .floating-cards-grid {
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .floating-cards-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
  
  .floating-card,
  .direction-right .floating-card,
  .card-0,
  .card-1,
  .card-2 {
    transform: translateY(50px);
  }
  
  .floating-card.visible {
    transform: translateY(0) !important;
  }
  
  .floating-cards-wrapper {
    margin-top: 2rem;
  }
}
.card-2 { transform: translateX(100px); }

.direction-right .card-0 { transform: translateX(100px); }
.direction-right .card-1 { transform: translateY(100px); }
.direction-right .card-2 { transform: translateX(-100px); }

.floating-card.visible {
  opacity: 1;
  transform: translate(0) !important;
}

.delay-0 { transition-delay: 0.2s; }
.delay-1 { transition-delay: 0.4s; }
.delay-2 { transition-delay: 0.6s; }

@media (max-width: 1200px) {
  .floating-cards-grid {
    gap: 1.5rem;
    padding: 0 3%;
  }
}

@media (max-width: 768px) {
  .floating-cards-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0 1rem;
  }
  
  .floating-card {
    max-width: 320px;
    margin: 0 auto;
  }
  
  .card-0,
  .card-1,
  .card-2,
  .direction-right .card-0,
  .direction-right .card-1,
  .direction-right .card-2 {
    transform: translateY(50px);
  }
}
</style>