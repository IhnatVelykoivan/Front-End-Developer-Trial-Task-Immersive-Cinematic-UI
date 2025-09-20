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
@import url('../../assets/styles/ContentSection.css');
</style>