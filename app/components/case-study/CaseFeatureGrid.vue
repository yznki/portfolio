<template>
  <section
    ref="sectionRef"
    :class="[
      baseClasses,
      'transition duration-700 ease-out',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      classOverride
    ]"
    :aria-label="ariaLabel || 'Feature grid'"
  >
    <CaseContainer>
      <div class="space-y-6">
        <div class="space-y-3">
          <p :class="kickerClasses">Highlights</p>
          <h3 :class="titleClasses">{{ title || 'Principles translated into interfaces' }}</h3>
          <p :class="descriptionClasses">
            {{ description || 'Feature building blocks framed with clear hierarchy and supportive tags.' }}
          </p>
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div
            v-for="feature in featuresToRender"
            :key="feature.title"
            :class="cardClasses"
          >
            <div class="flex items-center gap-3">
              <div :class="iconWrapper">
                <span class="text-xl" aria-hidden="true">{{ feature.icon }}</span>
              </div>
              <div>
                <p class="text-lg md:text-xl font-semibold" :class="titleColor">{{ feature.title }}</p>
                <p class="text-sm text-slate-600" :class="metaColor">{{ feature.tag }}</p>
              </div>
            </div>
            <p class="text-base leading-relaxed" :class="bodyColor">{{ feature.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="pill in feature.pills"
                :key="pill"
                class="text-xs uppercase tracking-[0.1em] px-3 py-1 rounded-full"
                :class="pillClasses"
              >
                {{ pill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </CaseContainer>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import CaseContainer from './CaseContainer.vue'

type Variant = 'minimal' | 'editorial' | 'bold'

type Feature = { title: string; description: string; tag: string; pills: string[]; icon: string }

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
    { threshold: 0.18 }
  )
  observer.observe(sectionRef.value)
})

onBeforeUnmount(() => observer?.disconnect())

const featuresToRender = computed<Feature[]>(() =>
  props.features?.length
    ? props.features
    : [
        {
          title: 'Design tokens',
          description: 'Unified spacing, color, and typography scales keep teams aligned.',
          tag: 'System',
          pills: ['tokens', 'scales'],
          icon: '✦'
        },
        {
          title: 'Responsive grid',
          description: 'Layouts adapt across breakpoints with intentional whitespace.',
          tag: 'Layout',
          pills: ['grid', 'rhythm'],
          icon: '▥'
        },
        {
          title: 'Micro-interactions',
          description: 'Hover and focus states guide attention without distraction.',
          tag: 'Motion',
          pills: ['feedback', 'a11y'],
          icon: '↺'
        },
        {
          title: 'Documentation',
          description: 'Usage notes and examples make onboarding faster for collaborators.',
          tag: 'Guides',
          pills: ['guides', 'handoff'],
          icon: '☰'
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

const cardClasses = computed(() => {
  const radius = props.variant === 'bold' ? 'rounded-xl' : props.variant === 'editorial' ? 'rounded-3xl' : 'rounded-2xl'
  const bg = props.variant === 'bold' ? 'border border-white/10 bg-white/5' : 'border border-slate-200 bg-white'
  const editorialBg = props.variant === 'editorial' ? 'border-slate-100 bg-white/70 backdrop-blur' : ''
  return `${radius} ${bg} ${editorialBg} p-6 flex flex-col gap-3 transition hover:-translate-y-0.5`
})

const iconWrapper = computed(() =>
  props.variant === 'bold'
    ? 'flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 border border-white/10 text-white'
    : 'flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-900'
)

const titleColor = computed(() => (props.variant === 'bold' ? 'text-white' : 'text-slate-900'))
const metaColor = computed(() => (props.variant === 'bold' ? 'text-slate-300' : 'text-slate-500'))
const bodyColor = computed(() => (props.variant === 'bold' ? 'text-slate-200' : 'text-slate-700'))
const pillClasses = computed(() =>
  props.variant === 'bold'
    ? 'bg-white/10 text-slate-200 border border-white/15'
    : 'bg-slate-100 text-slate-700 border border-slate-200'
)
</script>
