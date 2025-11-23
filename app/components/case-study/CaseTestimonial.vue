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
    <CaseContainer>
      <div :class="wrapperClasses">
        <div class="space-y-3">
          <p :class="kickerClasses">Testimonial</p>
          <h3 :class="titleClasses">{{ heading || 'Partner praise' }}</h3>
        </div>
        <div class="relative space-y-4">
          <span v-if="variant === 'bold'" class="absolute -left-4 -top-8 text-7xl font-black text-white/10" aria-hidden="true">“</span>
          <p :class="quoteClasses">{{ quote || 'The new system elevated every interaction. It is intentional, expressive, and accessible.' }}</p>
          <div class="flex items-center gap-3">
            <img :src="avatar || defaultAvatar" alt="" class="h-12 w-12 rounded-full object-cover" />
            <div>
              <p class="text-base font-semibold" :class="nameColor">{{ name || 'Jordan Rivera' }}</p>
              <p class="text-sm" :class="roleColor">{{ role || 'Brand Director, Solstice Studio' }}</p>
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

const props = defineProps({
  heading: { type: String, default: '' },
  quote: { type: String, default: '' },
  name: { type: String, default: '' },
  role: { type: String, default: '' },
  avatar: { type: String, default: '' },
  variant: { type: String as () => Variant, default: 'minimal' },
  ariaLabel: { type: String, default: '' },
  classOverride: { type: String, default: '' }
})

const defaultAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'

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
  return `${radius} ${bg} ${editorialBg} p-8 space-y-6`
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

const quoteClasses = computed(() =>
  props.variant === 'bold'
    ? 'text-lg md:text-xl leading-relaxed text-slate-100'
    : 'text-lg md:text-xl leading-relaxed text-slate-800'
)

const nameColor = computed(() => (props.variant === 'bold' ? 'text-white' : 'text-slate-900'))
const roleColor = computed(() => (props.variant === 'bold' ? 'text-slate-300' : 'text-slate-600'))
</script>
