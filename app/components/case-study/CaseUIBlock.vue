<template>
  <div :class="cardClasses">
    <div class="flex items-center justify-between text-xs uppercase tracking-[0.1em]" :class="labelColor">
      <span>{{ label }}</span>
      <span class="rounded-full px-3 py-1 text-[0.7rem]" :class="pillClasses">{{ tag }}</span>
    </div>
    <div :class="imageWrapper">
      <img :src="image" :alt="alt || label" class="h-full w-full object-cover" />
    </div>
    <p class="text-lg md:text-xl font-semibold" :class="titleColor">{{ title }}</p>
    <p class="text-sm text-slate-600" :class="descriptionColor">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'minimal' | 'editorial' | 'bold'

const props = defineProps({
  label: { type: String, default: '' },
  tag: { type: String, default: '' },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  image: { type: String, required: true },
  alt: { type: String, default: '' },
  variant: { type: String as () => Variant, default: 'minimal' }
})

const cardClasses = computed(() => {
  const radius = props.variant === 'bold' ? 'rounded-xl' : props.variant === 'editorial' ? 'rounded-3xl' : 'rounded-2xl'
  const bg = props.variant === 'bold' ? 'border border-white/10 bg-white/5' : 'border border-slate-200 bg-white'
  const editorialBg = props.variant === 'editorial' ? 'border-slate-100 bg-white/70 backdrop-blur' : ''
  return `${radius} ${bg} ${editorialBg} p-5 flex flex-col gap-3 hover:-translate-y-0.5 transition`
})

const imageWrapper = computed(() => {
  const radius = props.variant === 'bold' ? 'rounded-lg' : props.variant === 'editorial' ? 'rounded-2xl' : 'rounded-xl'
  return `overflow-hidden h-52 w-full ${radius}`
})

const labelColor = computed(() => (props.variant === 'bold' ? 'text-slate-300' : 'text-slate-500'))
const titleColor = computed(() => (props.variant === 'bold' ? 'text-white' : 'text-slate-900'))
const descriptionColor = computed(() => (props.variant === 'bold' ? 'text-slate-300' : 'text-slate-600'))
const pillClasses = computed(() =>
  props.variant === 'bold' ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 rounded-full' : 'bg-slate-100 text-slate-700 rounded-full'
)
</script>
