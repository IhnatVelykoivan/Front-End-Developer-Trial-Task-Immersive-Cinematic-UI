<template>
  <div class="section-navigator">
    <!-- ВЕРХНЯЯ КНОПКА - Previous Section -->
    <div 
      v-if="!isFirst" 
      class="nav-button-top"
      @click="handleClick('up')"
    >
      <div class="nav-button-content">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
        <span>{{ previousSectionName || 'Previous' }}</span>
      </div>
    </div>

    <!-- СЕРЕДИНА - Контент секции -->
    <div class="section-content">
      <slot></slot>
    </div>

    <!-- НИЖНЯЯ КНОПКА - Next Section -->
    <div 
      v-if="!isLast" 
      class="nav-button-bottom"
      @click="handleClick('down')"
    >
      <div class="nav-button-content">
        <span>{{ nextSectionName || 'Next' }}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionNavigator',
  props: {
    currentSection: {
      type: String,
      required: true
    },
    isFirst: {
      type: Boolean,
      default: false
    },
    isLast: {
      type: Boolean,
      default: false
    },
    previousSectionName: {
      type: String,
      default: ''
    },
    nextSectionName: {
      type: String,
      default: ''
    },
    disableNavigation: {
      type: Boolean,
      default: false
    }
  },
  emits: ['navigate'],
  mounted() {
    console.log(`🔍 SectionNavigator "${this.currentSection}":`, {
      isFirst: this.isFirst,
      isLast: this.isLast,
      previousSectionName: this.previousSectionName,
      nextSectionName: this.nextSectionName
    });
  },
  methods: {
    handleClick(direction) {
      console.log(`🖱️ Navigation click: ${this.currentSection} → ${direction}`);
      this.$emit('navigate', direction);
    }
  }
}
</script>

<style scoped>
.section-navigator {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ВЕРХНЯЯ КНОПКА - 10vh */
.nav-button-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 10vh;
  min-height: 10vh;
  background: transparent;
  backdrop-filter: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
}

.nav-button-top:hover {
  background: transparent;
}

/* КОНТЕНТ СЕКЦИИ - 80vh */
.section-content {
  position: relative;
  height: 100vh;
  min-height: 100vh;
  padding-top: 10vh;
  padding-bottom: 10vh;
  box-sizing: border-box;
  overflow: hidden;
}

/* НИЖНЯЯ КНОПКА - 10vh */
.nav-button-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 10vh;
  min-height: 10vh;
  background: transparent;
  backdrop-filter: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
}

.nav-button-bottom:hover {
  background: transparent;
}

/* СОДЕРЖИМОЕ КНОПОК */
.nav-button-content {
  display: flex;
  align-items: center;
  gap: 15px;
  color: white;
  font-weight: 700;
  font-size: 18px;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.8);
  transition: all 0.3s ease;
  padding: 12px 24px;
  background: rgba(0,0,0,0.7);
  border-radius: 50px;
  border: 1px solid rgba(255,255,255,0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.nav-button-top:hover .nav-button-content,
.nav-button-bottom:hover .nav-button-content {
  color: black;
  background: rgba(255,255,255,0.95);
  border: 1px solid rgba(0,0,0,0.1);
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
  transform: scale(1.05);
  box-shadow: 0 8px 30px rgba(255,255,255,0.4);
}

.nav-button-content svg {
  stroke: white;
  transition: all 0.3s ease;
}

.nav-button-top:hover .nav-button-content svg,
.nav-button-bottom:hover .nav-button-content svg {
  stroke: black;
}
</style>
