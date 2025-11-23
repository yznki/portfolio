<template>
  <section
    ref="sectionRef"
    :class="[
      baseClasses,
      'transition duration-700 ease-out',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      classOverride
    ]"
    :aria-label="ariaLabel || 'Feature highlights'"
  >
    <div :class="containerClasses">
      <div class="flex flex-col gap-3">
        <p :class="kickerClasses">Highlights</p>
        <h3 :class="titleClasses">{{ title || 'Systems thinking that keeps brands coherent' }}</h3>
        <p :class="descriptionClasses">
          {{ description || 'Feature blocks that translate strategic pillars into tactile experiences across every touchpoint.' }}
        </p>
      </div>
      <div :class="gridClasses">
        <div
          v-for="feature in featuresToRender"
          :key="feature.title"
          :class="featureCardClasses"
        >
          <div class="flex items-center gap-3">
            <div :class="iconClasses">
              <span class="text-lg">{{ feature.icon || '✦' }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <p class="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500" :class="textMuted">{{ feature.category }}</p>
              <h4 class="text-lg font-semibold text-slate-900" :class="textOnDark">{{ feature.title }}</h4>
            </div>
          </div>
          <p class="text-sm leading-relaxed text-slate-600" :class="textMuted">
            {{ feature.description }}
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in feature.tags || []"
              :key="tag"
              class="rounded-full px-3 py-1 text-xs font-semibold"
              :class="pillClasses"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

type Variant = 'minimal' | 'editorial' | 'bold'

type Feature = { title: string; description: string; category?: string; tags?: string[]; icon?: string }

const props = defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  features: { type: Array as () => Feature[], default: () => [] },
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
    { threshold: 0.15 }
  )
  observer.observe(sectionRef.value)
})

onBeforeUnmount(() => observer?.disconnect())

const featuresToRender = computed<Feature[]>(() =>
  props.features?.length
    ? props.features
    : [
        {
          category: 'Systems',
          title: 'Component library',
          description: 'Reusable UI primitives with clear states and accessibility baked in.',
          tags: ['Atoms', 'Tokens', 'States'],
          icon: '🧩'
        },
        {
          category: 'Identity',
          title: 'Motion language',
          description: 'Micro-interactions that reinforce the brand voice without overwhelm.',
          tags: ['Easing', 'Timing', 'Microcopy'],
          icon: '✨'
        },
        {
          category: 'Governance',
          title: 'Guideline hub',
          description: 'Editorial-style documentation that keeps teams aligned.',
          tags: ['Templates', 'Narrative', 'Snippets'],
          icon: '📘'
        }
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

const containerClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'mx-auto max-w-6xl px-6 py-14 lg:px-12'
    case 'bold':
      return 'mx-auto max-w-6xl px-6 py-16 lg:px-12'
    default:
      return 'mx-auto max-w-5xl px-6 py-12 lg:px-10'
  }
})

const kickerClasses = computed(() =>
  props.variant === 'bold'
    ? 'text-xs font-semibold uppercase tracking-[0.12em] text-emerald-300'
    : 'text-xs font-semibold uppercase tracking-[0.12em] text-slate-500'
)

const titleClasses = computed(() =>
  props.variant === 'bold'
    ? 'text-3xl font-bold tracking-tight text-white'
    : 'text-3xl font-semibold tracking-tight text-slate-900'
)

const descriptionClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'max-w-3xl text-lg leading-relaxed text-slate-600'
    case 'bold':
      return 'max-w-3xl text-lg leading-relaxed text-slate-200'
    default:
      return 'max-w-3xl text-lg leading-relaxed text-slate-700'
  }
})

const gridClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
    case 'bold':
      return 'mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
    default:
      return 'mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
  }
})

const featureCardClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white/70 p-5 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md'
    case 'bold':
      return 'flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-5 shadow-inner transition hover:-translate-y-1 hover:border-emerald-300/40'
    default:
      return 'flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition hover:-translate-y-1'
  }
})

const iconClasses = computed(() =>
  props.variant === 'bold'
    ? 'flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-lg'
    : 'flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-lg text-emerald-700'
)

const pillClasses = computed(() =>
  props.variant === 'bold'
    ? 'bg-white/5 text-emerald-200 border border-emerald-300/40'
    : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
)

const textOnDark = computed(() => (props.variant === 'bold' ? 'text-white' : ''))
const textMuted = computed(() => (props.variant === 'bold' ? 'text-slate-300' : 'text-slate-600'))
</script>
