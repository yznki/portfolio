<template>
  <section
    ref="sectionRef"
    :class="[
      baseClasses,
      'transition duration-700 ease-out',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      classOverride
    ]"
    :aria-label="ariaLabel || 'UI showcase'"
  >
    <div :class="containerClasses">
      <div class="flex flex-col gap-3">
        <p :class="kickerClasses">Interface</p>
        <h3 :class="titleClasses">{{ title || 'Interfaces designed to feel inevitable' }}</h3>
        <p :class="descriptionClasses">
          {{ description || 'Each UI surface borrows from the brand language—rhythmic spacing, confident typography, and focus on clarity.' }}
        </p>
      </div>
      <div :class="gridClasses">
        <article
          v-for="shot in shotsToRender"
          :key="shot.title"
          :class="cardClasses"
        >
          <div class="relative overflow-hidden rounded-2xl" :class="imageFrameClasses">
            <img
              :src="shot.image"
              :alt="shot.title"
              class="h-56 w-full object-cover transition duration-500 hover:scale-[1.02]"
            />
            <div v-if="shot.tag" class="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
              {{ shot.tag }}
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <h4 class="text-lg font-semibold text-slate-900" :class="textOnDark">{{ shot.title }}</h4>
            <p class="text-sm text-slate-600" :class="textMuted">{{ shot.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

type Variant = 'minimal' | 'editorial' | 'bold'

type Shot = { title: string; description: string; image: string; tag?: string }

const props = defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  shots: { type: Array as () => Shot[], default: () => [] },
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

const shotsToRender = computed<Shot[]>(() =>
  props.shots?.length
    ? props.shots
    : [
        {
          title: 'Design System Dashboard',
          description: 'Unified control center with modular cards and progressive disclosure.',
          image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80',
          tag: 'Product'
        },
        {
          title: 'Mobile Experience',
          description: 'Edge-to-edge canvas with focus on legibility and tactile controls.',
          image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80',
          tag: 'Mobile'
        },
        {
          title: 'Guideline Library',
          description: 'Editorial layouts tailored for onboarding and governance.',
          image: 'https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1200&q=80',
          tag: 'Docs'
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
      return 'mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'
  }
})

const cardClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white/70 p-4 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md'
    case 'bold':
      return 'flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-4 shadow-inner transition hover:-translate-y-1 hover:border-emerald-300/40'
    default:
      return 'flex flex-col gap-4 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm transition hover:-translate-y-1'
  }
})

const imageFrameClasses = computed(() =>
  props.variant === 'bold'
    ? 'border border-white/10 bg-slate-800'
    : 'border border-slate-200/70 bg-slate-100'
)

const textOnDark = computed(() => (props.variant === 'bold' ? 'text-white' : ''))
const textMuted = computed(() => (props.variant === 'bold' ? 'text-slate-300' : 'text-slate-600'))
</script>
