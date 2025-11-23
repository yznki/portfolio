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
    <CaseContainer>
      <div class="space-y-6">
        <div class="space-y-3">
          <p :class="kickerClasses">Interface</p>
          <h3 :class="titleClasses">{{ title || 'UI library built for clarity' }}</h3>
          <p :class="descriptionClasses">
            {{ description || 'Reusable UI building blocks styled for brand fidelity and usability.' }}
          </p>
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CaseUIBlock
            v-for="block in blocksToRender"
            :key="block.label"
            :label="block.label"
            :title="block.title"
            :description="block.description"
            :tag="block.tag"
            :image="block.image"
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
import CaseUIBlock from './CaseUIBlock.vue'

type Variant = 'minimal' | 'editorial' | 'bold'

type Block = { label: string; title: string; description: string; tag: string; image: string }

const props = defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  blocks: { type: Array as () => Block[], default: () => [] },
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

const blocksToRender = computed<Block[]>(() =>
  props.blocks?.length
    ? props.blocks
    : [
        {
          label: 'Dashboards',
          tag: 'Product',
          title: 'Metrics Hub',
          description: 'High-clarity charting and controls for decision makers.',
          image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80'
        },
        {
          label: 'Marketing',
          tag: 'Web',
          title: 'Campaign landing',
          description: 'Hero, testimonials, and pricing components under one language.',
          image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80'
        },
        {
          label: 'Design system',
          tag: 'Components',
          title: 'Atoms + molecules',
          description: 'Buttons, forms, cards, and overlays defined for teams.',
          image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=900&q=80'
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
</script>
