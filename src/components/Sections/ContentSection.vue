<template>
  <section :id="id" class="min-h-screen flex flex-col items-center justify-center py-20 relative overflow-hidden">
    <!-- Убираем градиентный overlay -->
    <div class="absolute inset-0 opacity-10 parallax-layer-1">
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div class="text-block max-w-4xl mx-auto text-center smooth-text relative z-10">
        <h2 class="text-4xl md:text-5xl font-bold mb-8 fade-in-up">{{ title }}</h2>
        <div class="max-w-3xl mx-auto">
          <p v-for="(paragraph, index) in content" :key="index" class="text-xl md:text-2xl opacity-90 mb-6 leading-relaxed">
            {{ paragraph }}
          </p>
        </div>
      </div>

      <div class="floating-cards-wrapper w-full mt-16"
        :class="{ 'direction-right': direction === 'right' }"
      >
        <div class="floating-cards-grid max-w-6xl mx-auto">
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
    id: String,
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
    // Простая инициализация - показываем все карточки через небольшую задержку
    this.$nextTick(() => {
      const cards = this.$el.querySelectorAll('.floating-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('visible');
        }, index * 200);
      });
    });

    // Создаем IntersectionObserver для отслеживания видимости секции
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Если секция видима, добавляем класс visible всем карточкам
          const cards = entry.target.querySelectorAll('.floating-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('visible');
            }, index * 150);
          });
        }
      });
    }, {
      threshold: 0.2
    });

    // Начинаем наблюдение за секцией
    observer.observe(this.$el);
  }
}
</script>

<style scoped>
@import url('../../assets/styles/ContentSection.css');
</style>