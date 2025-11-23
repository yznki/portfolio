<template>
  <section
    ref="sectionRef"
    :class="[
      baseClasses,
      'transition duration-700 ease-out',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      classOverride
    ]"
    :aria-label="ariaLabel || 'Typography system'"
  >
    <CaseContainer>
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div class="space-y-3">
          <p :class="kickerClasses">Typography</p>
          <h3 :class="titleClasses">{{ title || 'Precision typography for digital and print' }}</h3>
          <p :class="descriptionClasses">
            {{ description || 'A disciplined typographic stack that adapts across touchpoints with optical sizing and expressive display options.' }}
          </p>
          <div class="flex flex-wrap items-center gap-3">
            <span v-if="fontName" class="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
              {{ fontName }}
            </span>
            <span v-if="secondaryFont" class="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              {{ secondaryFont }}
            </span>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-4" :class="ghostWrapper">
          <div
            v-for="sample in samplesToRender"
            :key="sample.label"
            :class="sampleCardClasses"
          >
            <div class="flex items-center justify-between text-xs uppercase tracking-[0.1em]" :class="metaColor">
              <span>{{ sample.label }}</span>
              <span>{{ sample.size }}</span>
            </div>
            <p :class="sampleTextClasses">{{ sample.text }}</p>
          </div>
          <span
            v-if="variant === 'bold'"
            aria-hidden="true"
            class="pointer-events-none absolute -right-6 -top-8 text-8xl font-black uppercase text-white/5"
          >
            {{ (fontName || 'S')?.charAt(0) }}
          </span>
        </div>
      </div>
    </CaseContainer>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import CaseContainer from './CaseContainer.vue'

type Variant = 'minimal' | 'editorial' | 'bold'

type Sample = { label: string; text: string; size: string }

const props = defineProps({
  title: { type: String, default: '' },
  fontName: { type: String, default: '' },
  secondaryFont: { type: String, default: '' },
  description: { type: String, default: '' },
  samples: { type: Array as () => Sample[], default: () => [] },
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

const samplesToRender = computed<Sample[]>(() =>
  props.samples?.length
    ? props.samples
    : [
        { label: 'Display', text: 'Design like you mean it.', size: '48px/1.1' },
        { label: 'Heading', text: 'Building legibility across touchpoints.', size: '32px/1.2' },
        { label: 'Body', text: 'Crafted for clarity in product flows and long-form storytelling.', size: '18px/1.6' }
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

const sampleCardClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'rounded-3xl border border-slate-100 bg-white/70 p-5 shadow-sm backdrop-blur'
    case 'bold':
      return 'relative rounded-xl border border-white/10 bg-white/5 p-5'
    default:
      return 'rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm'
  }
})

const sampleTextClasses = computed(() =>
  props.variant === 'bold'
    ? 'mt-2 text-2xl md:text-3xl font-bold text-white'
    : 'mt-2 text-2xl md:text-3xl font-semibold text-slate-900'
)

const metaColor = computed(() => (props.variant === 'bold' ? 'text-slate-300' : 'text-slate-500'))
const ghostWrapper = computed(() => (props.variant === 'bold' ? 'relative' : ''))
</script>
