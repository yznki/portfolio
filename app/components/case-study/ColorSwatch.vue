<template>
  <div :class="wrapperClasses">
    <div :style="{ backgroundColor: color.hex }" :class="colorBlockClasses"></div>
    <div class="space-y-1">
      <p class="text-lg md:text-xl font-semibold" :class="textColor">{{ color.name }}</p>
      <p class="text-sm text-slate-600" :class="subTextColor">{{ color.hex }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'minimal' | 'editorial' | 'bold'

type ColorItem = { name: string; hex: string }

const props = defineProps({
  color: { type: Object as () => ColorItem, required: true },
  variant: { type: String as () => Variant, default: 'minimal' },
  primary: { type: Boolean, default: false }
})

const wrapperClasses = computed(() => {
  const base = props.primary ? 'col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col gap-3' : 'flex flex-col gap-3'
  const radius = props.variant === 'bold' ? 'rounded-xl' : props.variant === 'editorial' ? 'rounded-3xl' : 'rounded-2xl'
  const bg = props.variant === 'bold' ? 'border border-white/10 bg-white/5' : 'border border-slate-200 bg-white'
  const editorialBg = props.variant === 'editorial' ? 'border-slate-100 bg-white/70 backdrop-blur' : ''
  return `${base} ${radius} ${props.variant === 'bold' ? 'p-5' : 'p-5'} ${bg} ${editorialBg}`.trim()
})

const colorBlockClasses = computed(() => {
  const radius = props.variant === 'bold' ? 'rounded-lg' : props.variant === 'editorial' ? 'rounded-2xl' : 'rounded-xl'
  return `${props.primary ? 'h-36' : 'h-28'} w-full ${radius}`
})

const textColor = computed(() => (props.variant === 'bold' ? 'text-white' : 'text-slate-900'))
const subTextColor = computed(() => (props.variant === 'bold' ? 'text-slate-300' : 'text-slate-600'))
</script>
