<template>
  <section class="min-h-screen flex flex-col justify-center py-20 px-5% parallax-container relative overflow-hidden">
    <div class="absolute inset-0 opacity-10 parallax-layer-1">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
    </div>

    <div class="text-block max-w-3xl mx-auto stagger-text relative z-10">
      <h2 class="text-4xl md:text-5xl font-bold mb-8 fade-in-up">{{ title }}</h2>
      <p v-for="(paragraph, index) in content" :key="index" class="text-xl md:text-2xl opacity-90 mb-6 leading-relaxed">
        {{ paragraph }}
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContentSection',
  props: {
    title: String,
    content: Array
  }
}
</script>

<style scoped>
.px-5\% {
  padding-left: 5%;
  padding-right: 5%;
}
</style>