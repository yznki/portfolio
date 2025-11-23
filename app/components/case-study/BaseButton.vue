<template>
  <button
    :type="type"
    :class="[baseClasses, classOverride]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'minimal' | 'editorial' | 'bold'

type ButtonTone = 'primary' | 'secondary'

const props = defineProps({
  variant: { type: String as () => Variant, default: 'minimal' },
  tone: { type: String as () => ButtonTone, default: 'primary' },
  type: { type: String, default: 'button' },
  classOverride: { type: String, default: '' }
})

const baseClasses = computed(() => {
  const common = 'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition'
  if (props.variant === 'bold') {
    return props.tone === 'primary'
      ? `${common} bg-emerald-500 text-slate-950 hover:bg-emerald-400 focus-visible:outline-emerald-300`
      : `${common} border border-white/20 bg-white/5 text-white hover:border-white/40 focus-visible:outline-white`
  }
  if (props.variant === 'editorial') {
    return props.tone === 'primary'
      ? `${common} bg-slate-900 text-white shadow-sm hover:bg-slate-800 focus-visible:outline-slate-900`
      : `${common} border border-slate-200 bg-white/80 text-slate-900 hover:border-slate-300 focus-visible:outline-slate-300`
  }
  return props.tone === 'primary'
    ? `${common} bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-900`
    : `${common} border border-slate-200 bg-white text-slate-900 hover:border-slate-300 focus-visible:outline-slate-400`
})
</script>
