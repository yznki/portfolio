<template>
  <div :class="[cardClasses, 'transition-colors duration-200']">
    <p class="text-xs uppercase tracking-[0.12em]" :class="labelColor">{{ label }}</p>
    <div class="mt-3 text-base md:text-lg font-semibold" :class="valueColor">
      <slot>{{ value }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'minimal' | 'editorial' | 'bold'

const props = defineProps({
  label: { type: String, default: '' },
  value: { type: String, default: '' },
  variant: { type: String as () => Variant, default: 'minimal' }
})

const cardBase = {
  minimal: 'rounded-2xl border border-slate-200 bg-white/90 shadow-sm',
  editorial: 'rounded-3xl border border-slate-100 bg-white/70 backdrop-blur shadow-sm',
  bold: 'rounded-xl border border-white/10 bg-white/5'
}

const labelColor = computed(() => ({
  minimal: 'text-slate-500',
  editorial: 'text-slate-500',
  bold: 'text-slate-300'
}[props.variant as Variant]))

const valueColor = computed(() => ({
  minimal: 'text-slate-900',
  editorial: 'text-slate-900',
  bold: 'text-white'
}[props.variant as Variant]))

const cardClasses = computed(() => cardBase[props.variant as Variant] + ' p-5 hover:-translate-y-0.5')
</script>
