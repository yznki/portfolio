<template>
  <section
    ref="sectionRef"
    :class="[
      baseClasses,
      'transition duration-700 ease-out',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      classOverride
    ]"
    :aria-label="ariaLabel || 'Results'"
  >
    <CaseContainer>
      <div class="space-y-6">
        <div class="space-y-3">
          <p :class="kickerClasses">Results</p>
          <h3 :class="titleClasses">{{ title || 'Measurable improvements post-launch' }}</h3>
          <p :class="descriptionClasses">
            {{ description || 'Key metrics that show the brand system performing in-market.' }}
          </p>
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="stat in statsToRender"
            :key="stat.label"
            :class="cardClasses"
          >
            <p class="text-xs uppercase tracking-[0.1em]" :class="metaColor">{{ stat.label }}</p>
            <p class="text-4xl md:text-5xl font-bold" :class="valueColor">{{ stat.value }}</p>
            <p class="text-sm leading-relaxed" :class="bodyColor">{{ stat.description }}</p>
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

type Stat = { label: string; value: string; description: string }

const props = defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  stats: { type: Array as () => Stat[], default: () => [] },
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

const statsToRender = computed<Stat[]>(() =>
  props.stats?.length
    ? props.stats
    : [
        { label: 'Brand recall', value: '+35%', description: 'Increase in aided recall after rollout.' },
        { label: 'Engagement', value: '+28%', description: 'Lift in interaction rates across product UI.' },
        { label: 'Consistency', value: '92%', description: 'Design debt reduced across teams and surfaces.' }
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

const descriptionClasses = computed(() => (props.variant === 'bold' ? 'max-w-3xl text-base md:text-lg text-slate-200 leading-relaxed' : 'max-w-3xl text-base md:text-lg text-slate-700 leading-relaxed'))

const cardClasses = computed(() => {
  const radius = props.variant === 'bold' ? 'rounded-xl' : props.variant === 'editorial' ? 'rounded-3xl' : 'rounded-2xl'
  const bg = props.variant === 'bold' ? 'border border-white/10 bg-white/5' : 'border border-slate-200 bg-white'
  const editorialBg = props.variant === 'editorial' ? 'border-slate-100 bg-white/70 backdrop-blur' : ''
  return `${radius} ${bg} ${editorialBg} p-6 flex flex-col gap-2`
})

const metaColor = computed(() => (props.variant === 'bold' ? 'text-slate-300' : 'text-slate-500'))
const valueColor = computed(() => (props.variant === 'bold' ? 'text-white' : 'text-slate-900'))
const bodyColor = computed(() => (props.variant === 'bold' ? 'text-slate-300' : 'text-slate-700'))
</script>
