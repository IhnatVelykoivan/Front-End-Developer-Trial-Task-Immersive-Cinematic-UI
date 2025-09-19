<template>
  <div class="w-full h-screen relative overflow-hidden parallax-container scale-in">
    <div
        class="absolute inset-0 bg-cover bg-center scale-in"
        :style="{ backgroundImage: 'url(' + imageUrl + ')' }"
    ></div>
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/70 parallax-layer-1"></div>
    <div class="absolute inset-0 bg-gradient-to-r from-black/40 to-purple-900/20 parallax-layer-2"></div>
  </div>
</template>

<script>
export default {
  name: 'ImageSection',
  props: {
    imageUrl: String
  }
}
</script>