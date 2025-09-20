<template>
  <footer :id="id" class="relative py-20 text-center section-gradient overflow-hidden footer-section">
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
    <div class="relative z-10 container mx-auto px-4">
      <p class="text-white/80 footer-text">© 2023 Zero Limits Experience</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  props: {
    id: String
  }
}
</script>

<style scoped>
.footer-section {
  padding: 5rem 0;
}

.footer-text {
  font-size: 1rem;
  line-height: 1.5;
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .footer-section {
    padding: 3rem 0;
  }
  
  .footer-text {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .footer-section {
    padding: 2.5rem 0;
  }
  
  .footer-text {
    font-size: 0.85rem;
    padding: 0 1rem;
  }
}
</style>