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
    <div :class="containerClasses">
      <div class="flex flex-col gap-3">
        <p :class="kickerClasses">Next</p>
        <h3 :class="titleClasses">{{ title || 'Ready to build your next brand chapter?' }}</h3>
        <p :class="descriptionClasses">
          {{ subtitle || 'Let’s orchestrate a system that scales your story without losing its soul.' }}
        </p>
      </div>
      <div :class="actionsClasses">
        <a
          v-if="primaryAction"
          :href="primaryAction.href"
          class="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          :class="primaryButtonClasses"
        >
          {{ primaryAction.label }}
          <span aria-hidden="true">→</span>
        </a>
        <a
          v-if="secondaryAction"
          :href="secondaryAction.href"
          class="inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          :class="secondaryButtonClasses"
        >
          {{ secondaryAction.label }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

type Variant = 'minimal' | 'editorial' | 'bold'

type Action = { label: string; href: string }

const props = defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  primaryAction: { type: Object as () => Action, default: () => ({ label: 'Book a session', href: '#' }) },
  secondaryAction: { type: Object as () => Action | null, default: () => ({ label: 'See process', href: '#' }) },
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

const containerClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'mx-auto flex max-w-5xl flex-col gap-6 rounded-3xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 px-6 py-12 shadow-sm lg:flex-row lg:items-center lg:justify-between lg:px-12'
    case 'bold':
      return 'mx-auto flex max-w-6xl flex-col gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 px-6 py-14 shadow-2xl lg:flex-row lg:items-center lg:justify-between lg:px-12'
    default:
      return 'mx-auto flex max-w-5xl flex-col gap-6 rounded-3xl border border-slate-200/70 bg-white px-6 py-12 shadow-sm lg:flex-row lg:items-center lg:justify-between lg:px-10'
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

const descriptionClasses = computed(() =>
  props.variant === 'bold'
    ? 'text-lg text-slate-200'
    : 'text-lg text-slate-700'
)

const actionsClasses = computed(() =>
  props.variant === 'editorial'
    ? 'flex flex-wrap items-center gap-3'
    : 'flex flex-wrap items-center gap-3'
)

const primaryButtonClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'bg-slate-900 text-white hover:-translate-y-0.5 hover:bg-slate-800'
    case 'bold':
      return 'bg-emerald-400 text-slate-900 hover:-translate-y-0.5 hover:bg-emerald-300'
    default:
      return 'bg-slate-900 text-white hover:-translate-y-0.5 hover:bg-slate-800'
  }
})

const secondaryButtonClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'border border-slate-200 bg-white text-slate-900 hover:-translate-y-0.5'
    case 'bold':
      return 'border border-white/20 bg-white/5 text-white hover:-translate-y-0.5'
    default:
      return 'border border-slate-200 bg-white text-slate-900 hover:-translate-y-0.5'
  }
})
</script>
