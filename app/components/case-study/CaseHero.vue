<template>
  <section
    ref="sectionRef"
    :class="[
      sectionBase,
      'transition duration-700 ease-out',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
      classOverride
    ]"
    :aria-label="ariaLabel || 'Case study hero'"
  >
    <CaseContainer>
      <div :class="heroGrid">
        <div class="flex flex-col gap-6 lg:gap-8">
          <div class="flex items-center gap-3 text-xs uppercase tracking-[0.12em]" :class="metaColor">
            <span class="inline-flex items-center gap-2">
              <span class="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true"></span>
              {{ label || 'Brand Identity' }}
            </span>
            <span :class="separatorColor">•</span>
            <span>{{ year || '2024' }}</span>
          </div>
          <div class="flex flex-col gap-3">
            <h1 :class="titleClasses">{{ title || 'Brand Revival for Solstice Studio' }}</h1>
            <p :class="taglineClasses">
              {{ tagline || 'Building a resilient, elevated brand language for a global creative collective.' }}
            </p>
          </div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <CaseStatCard :label="'Role'" :variant="variant">
              {{ role || 'Lead Designer' }}
            </CaseStatCard>
            <CaseStatCard :label="'Services'" :variant="variant">
              <ul class="space-y-1">
                <li v-for="service in servicesToRender" :key="service">{{ service }}</li>
              </ul>
            </CaseStatCard>
            <CaseStatCard :label="'Impact'" :variant="variant">
              {{ impact || '35% uplift in brand recall across key markets.' }}
            </CaseStatCard>
          </div>
        </div>
        <div v-if="image" :class="imageWrapperClasses">
          <img :src="image" :alt="imageAlt || 'Case study hero visual'" class="h-full w-full object-cover" />
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

const props = defineProps({
  label: { type: String, default: '' },
  title: { type: String, default: '' },
  tagline: { type: String, default: '' },
  role: { type: String, default: '' },
  year: { type: [String, Number], default: '' },
  services: { type: Array as () => string[], default: () => ['Identity system', 'Design language', 'Guidelines'] },
  impact: { type: String, default: '' },
  image: { type: String, default: '' },
  imageAlt: { type: String, default: '' },
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

const servicesToRender = computed(() =>
  props.services?.length ? props.services : ['Identity system', 'Design language', 'Guidelines']
)

const sectionBase = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'bg-white text-slate-900'
    case 'bold':
      return 'bg-slate-950 text-white'
    default:
      return 'bg-slate-50 text-slate-900'
  }
})

const heroGrid = computed(() => {
  if (props.variant === 'bold') {
    return 'grid grid-cols-1 gap-10 lg:grid-cols-2'
  }
  return 'grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]'
})

const titleClasses = computed(() =>
  props.variant === 'bold'
    ? 'text-3xl md:text-[3rem] font-bold tracking-tight'
    : 'text-3xl md:text-4xl font-semibold tracking-tight'
)

const taglineClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'max-w-2xl text-base md:text-lg leading-relaxed text-slate-600'
    case 'bold':
      return 'max-w-2xl text-base md:text-lg leading-relaxed text-slate-200'
    default:
      return 'max-w-2xl text-base md:text-lg leading-relaxed text-slate-700'
  }
})

const imageWrapperClasses = computed(() => {
  switch (props.variant as Variant) {
    case 'editorial':
      return 'relative h-80 w-full overflow-hidden rounded-3xl border border-slate-100 bg-slate-50 shadow-lg'
    case 'bold':
      return 'relative h-80 w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800'
    default:
      return 'relative h-80 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg'
  }
})

const metaColor = computed(() => (props.variant === 'bold' ? 'text-slate-300' : 'text-slate-500'))
const separatorColor = computed(() => (props.variant === 'bold' ? 'text-slate-400' : 'text-slate-400'))
</script>
