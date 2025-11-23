<template>
  <section
    ref="sectionRef"
    :class="[
      baseClasses,
      'transition duration-700 ease-out',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      classOverride
    ]"
    :aria-label="ariaLabel || 'Testimonial'"
  >
    <div :class="containerClasses">
      <div :class="quoteWrapperClasses">
        <div class="flex items-center gap-3">
          <div v-if="avatar" class="h-12 w-12 overflow-hidden rounded-full border border-white/30">
            <img :src="avatar" :alt="author" class="h-full w-full object-cover" />
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-900" :class="textOnDark">{{ author || 'Jordan Patel' }}</p>
            <p class="text-xs text-slate-500" :class="textMuted">{{ role || 'Chief Brand Officer, Northwind' }}</p>
          </div>
        </div>
        <blockquote :class="quoteClasses">
          “{{ quote || 'The new system re-energized how our teams build. It strikes the balance between discipline and delight.' }}”
        </blockquote>
      </div>
      <div :class="calloutClasses">
        <p class="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-600" :class="textMuted">Signal</p>
        <p class="text-sm text-slate-700" :class="textMuted">
          {{ callout || 'Documented impact and stakeholder confidence through design rituals and systemized delivery.' }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

type Variant = 'minimal' | 'editorial' | 'bold'

const props = defineProps({
  quote: { type: String, default: '' },
  author: { type: String, default: '' },
  role: { type: String, default: '' },
  avatar: { type: String, default: '' },
  callout: { type: String, default: '' },
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
      return 'mx-auto flex max-w-5xl flex-col gap-6 px-6 py-14 lg:flex-row lg:items-center lg:gap-12 lg:px-12'
    case 'bold':
      return 'mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 lg:flex-row lg:items-center lg:gap-16 lg:px-12'
    default:
      return 'mx-auto flex max-w-5xl flex-col gap-6 px-6 py-12 lg:flex-row lg:items-center lg:gap-10 lg:px-10'
  }
})

const quoteWrapperClasses = computed(() =>
  props.variant === 'bold'
    ? 'flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-inner'
    : 'flex-1 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm'
)

const quoteClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'mt-4 text-2xl font-semibold leading-tight text-slate-900'
    case 'bold':
      return 'mt-4 text-2xl font-bold leading-tight text-white'
    default:
      return 'mt-4 text-2xl font-semibold leading-tight text-slate-900'
  }
})

const calloutClasses = computed(() =>
  props.variant === 'bold'
    ? 'flex-1 rounded-xl border border-white/10 bg-white/5 p-5 text-slate-200 shadow-inner'
    : 'flex-1 rounded-xl border border-slate-200/70 bg-emerald-50 p-5 text-emerald-900 shadow-sm'
)

const textOnDark = computed(() => (props.variant === 'bold' ? 'text-white' : ''))
const textMuted = computed(() => (props.variant === 'bold' ? 'text-slate-300' : 'text-slate-600'))
</script>
