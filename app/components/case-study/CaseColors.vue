<template>
  <section
    ref="sectionRef"
    :class="[
      baseClasses,
      'transition duration-700 ease-out',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      classOverride
    ]"
    :aria-label="ariaLabel || 'Color system'"
  >
    <CaseContainer>
      <div class="space-y-6">
        <div class="space-y-3">
          <p :class="kickerClasses">Palette</p>
          <h3 :class="titleClasses">{{ title || 'A calm yet distinctive palette' }}</h3>
          <p :class="descriptionClasses">
            {{ description || 'Primary and supporting hues crafted for digital and print consistency.' }}
          </p>
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ColorSwatch
            v-for="(color, index) in colorsToRender"
            :key="color.name"
            :color="color"
            :variant="variant"
            :primary="index === 0"
          />
        </div>
      </div>
    </CaseContainer>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import CaseContainer from './CaseContainer.vue'
import ColorSwatch from './ColorSwatch.vue'

type Variant = 'minimal' | 'editorial' | 'bold'

type ColorItem = { name: string; hex: string }

const props = defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  colors: { type: Array as () => ColorItem[], default: () => [] },
  variant: { type: String as () => Variant, default: 'minimal' },
  ariaLabel: { type: String, default: '' },
  classOverride: { type: String, default: '' }
})

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!sectionRef.value) return
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.2 }
  )
  observer.observe(sectionRef.value)
})

onBeforeUnmount(() => observer?.disconnect())

const colorsToRender = computed<ColorItem[]>(() =>
  props.colors?.length
    ? props.colors
    : [
        { name: 'Primary', hex: '#0ea5e9' },
        { name: 'Ink', hex: '#0f172a' },
        { name: 'Mist', hex: '#e2e8f0' },
        { name: 'Accent', hex: '#10b981' }
      ]
)

const baseClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'bg-white text-slate-900'
    case 'bold':
      return 'bg-slate-950 text-white'
    default:
      return 'bg-slate-50 text-slate-900'
  }
})

const kickerClasses = computed(() =>
  props.variant === 'bold'
    ? 'text-xs uppercase tracking-[0.12em] text-emerald-300'
    : 'text-xs uppercase tracking-[0.12em] text-slate-500'
)

const titleClasses = computed(() =>
  props.variant === 'bold'
    ? 'text-3xl md:text-[3rem] font-bold tracking-tight'
    : 'text-3xl md:text-4xl font-semibold tracking-tight'
)

const descriptionClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'max-w-3xl text-base md:text-lg leading-relaxed text-slate-600'
    case 'bold':
      return 'max-w-3xl text-base md:text-lg leading-relaxed text-slate-200'
    default:
      return 'max-w-3xl text-base md:text-lg leading-relaxed text-slate-700'
  }
})
</script>
