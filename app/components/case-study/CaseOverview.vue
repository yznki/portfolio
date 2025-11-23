<template>
  <section
    ref="sectionRef"
    :class="[
      baseClasses,
      'transition duration-700 ease-out',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      classOverride
    ]"
    :aria-label="ariaLabel || 'Case overview'"
  >
    <CaseContainer>
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-14">
        <div class="space-y-4">
          <p :class="kickerClasses">Overview</p>
          <h2 :class="titleClasses">{{ title || 'Design language shaped for longevity.' }}</h2>
          <p :class="descriptionClasses">
            {{ summary || 'A modular brand system connecting digital and physical experiences through rigorous typography, disciplined color, and cohesive UI foundations.' }}
          </p>
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CaseStatCard
            v-for="detail in detailsToRender"
            :key="detail.label"
            :label="detail.label"
            :value="detail.value"
            :variant="variant"
          />
        </div>
      </div>
    </CaseContainer>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import CaseContainer from './CaseContainer.vue'
import CaseStatCard from './CaseStatCard.vue'

type Variant = 'minimal' | 'editorial' | 'bold'

type Detail = { label: string; value: string }

const props = defineProps({
  title: { type: String, default: '' },
  summary: { type: String, default: '' },
  details: { type: Array as () => Detail[], default: () => [] },
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

const detailsToRender = computed<Detail[]>(() =>
  props.details?.length
    ? props.details
    : [
        { label: 'Deliverables', value: 'Identity toolkit, UI kit, Motion system' },
        { label: 'Timeline', value: '12 weeks from discovery to launch' },
        { label: 'Team', value: 'Lead designer, strategist, motion partner' }
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
      return 'max-w-2xl text-base md:text-lg leading-relaxed text-slate-600'
    case 'bold':
      return 'max-w-2xl text-base md:text-lg leading-relaxed text-slate-200'
    default:
      return 'max-w-2xl text-base md:text-lg leading-relaxed text-slate-700'
  }
})
</script>
