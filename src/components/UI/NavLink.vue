<template>
  <a 
    :href="href"
    @click.prevent="$emit('click', $event)"
    class="nav-link"
    :class="{ 
      'nav-link-active': isActive,
      'nav-link-mobile': isMobile 
    }"
  >
    <span class="nav-link-text">{{ label }}</span>
    <span class="nav-link-glow"></span>
  </a>
</template>

<script>
export default {
  name: 'NavLink',
  props: {
    href: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click']
}
</script>

<style scoped>
@import url('../../assets/styles/NavLink.css');
</style>