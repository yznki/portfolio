<template>
  <section
    ref="sectionRef"
    :class="[
      baseClasses,
      'transition duration-700 ease-out',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      classOverride
    ]"
    :aria-label="ariaLabel || 'Call to action'"
  >
    <CaseContainer>
      <div :class="wrapperClasses">
        <div class="space-y-3 max-w-2xl">
          <p :class="kickerClasses">{{ label || 'Next steps' }}</p>
          <h3 :class="titleClasses">{{ title || 'Ready to build a resilient brand system?' }}</h3>
          <p :class="descriptionClasses">
            {{ description || 'Let’s collaborate on a case study-worthy identity that feels intentional across every touchpoint.' }}
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <BaseButton :variant="variant" tone="primary">{{ primaryCta || 'Start a project' }}</BaseButton>
          <BaseButton :variant="variant" tone="secondary">{{ secondaryCta || 'Download deck' }}</BaseButton>
        </div>
      </div>
    </CaseContainer>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import CaseContainer from './CaseContainer.vue'
import BaseButton from './BaseButton.vue'

type Variant = 'minimal' | 'editorial' | 'bold'

const props = defineProps({
  label: { type: String, default: '' },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  primaryCta: { type: String, default: '' },
  secondaryCta: { type: String, default: '' },
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

const wrapperClasses = computed(() => {
  const radius = props.variant === 'bold' ? 'rounded-xl' : props.variant === 'editorial' ? 'rounded-3xl' : 'rounded-2xl'
  const bg = props.variant === 'bold' ? 'border border-white/10 bg-white/5' : 'border border-slate-200 bg-white'
  const editorialBg = props.variant === 'editorial' ? 'border-slate-100 bg-white/70 backdrop-blur' : ''
  return `${radius} ${bg} ${editorialBg} flex flex-col gap-4 p-8 lg:flex-row lg:items-center lg:justify-between`
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

const descriptionClasses = computed(() => (props.variant === 'bold' ? 'text-base md:text-lg text-slate-200' : 'text-base md:text-lg text-slate-700'))
</script>
