<template>
  <div class="bg-slate-100">
    <header class="mx-auto max-w-6xl px-6 pb-8 pt-10 lg:px-12">
      <p class="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">System demo</p>
      <h1 class="mt-2 text-4xl font-bold tracking-tight text-slate-900">Case Study Design System Sandbox</h1>
      <p class="mt-3 max-w-3xl text-lg text-slate-700">
        Explore reusable case study blocks in three visual variants. Swap props, combine sections, and craft unique narratives without
        reinventing layouts.
      </p>
    </header>

    <div class="space-y-16 pb-16">
      <section
        v-for="variant in variants"
        :key="variant"
        class="space-y-10 bg-white/70 px-4 py-8 shadow-sm ring-1 ring-slate-200/70 lg:px-8"
      >
        <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-2">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Variant</p>
            <h2 class="text-2xl font-semibold capitalize text-slate-900">{{ variant }}</h2>
          </div>
          <span
            class="rounded-full px-4 py-2 text-xs font-semibold"
            :class="variant === 'bold' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white'"
          >
            Live demo
          </span>
        </div>

        <CaseHero
          :variant="variant"
          label="Brand rollout"
          title="Modular system for Solstice Studio"
          tagline="A resilient brand kit that scales from product UI to physical touchpoints."
          role="Design lead & art direction"
          :year="2024"
          :services="['Identity system', 'UI kit', 'Guidelines', 'Motion']"
          impact="Multi-channel launch across 12 markets"
          image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=80"
          image-alt="Design hero image"
        />

        <CaseOverview
          :variant="variant"
          title="Outcome-oriented storytelling"
          summary="A narrative-friendly architecture that frames the problem, the build, and the evidence in a digestible way."
          :details="overviewDetails"
        />

        <CaseTypography
          :variant="variant"
          title="Typography that carries the brand"
          font-name="Neue Haas Grotesk"
          secondary-font="Söhne Mono"
          description="Flexible typographic pairing enabling both editorial storytelling and precise UI labelling."
          :samples="typeSamples"
        />

        <CaseColors
          :variant="variant"
          title="Palette tuned for contrast"
          description="Balanced accents with dependable neutrals. Optimized for accessibility and tokenization."
          :colors="colorTokens"
        />

        <CaseUIShowcase
          :variant="variant"
          title="Product realities"
          description="UI captures that show how the system guides interfaces while leaving room for personality."
          :shots="uiShots"
        />

        <CaseFeatureGrid
          :variant="variant"
          title="System pillars"
          description="Feature blocks articulate the underpinnings of the brand and product experience."
          :features="featureItems"
        />

        <CaseStats
          :variant="variant"
          title="Results that matter"
          description="Signals of adoption, consistency, and impact after rollout."
          :stats="statItems"
        />

        <CaseTestimonial
          :variant="variant"
          quote="The modular approach meant every touchpoint felt intentional and connected."
          author="Avery Lin"
          role="VP Product, Solstice"
          avatar="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=400&q=80"
          callout="Strategic rituals aligned stakeholders and produced measurable design velocity."
        />

        <CaseCTA
          :variant="variant"
          title="Build your brand system with me"
          subtitle="Let’s pair your business goals with a design language that scales."
          :primary-action="{ label: 'Start a project', href: '#' }"
          :secondary-action="{ label: 'Download creds', href: '#' }"
        />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const variants = ['minimal', 'editorial', 'bold'] as const

const overviewDetails = [
  { label: 'Deliverables', value: 'Identity, UI kit, Motion library' },
  { label: 'Timeline', value: '12-week sprint cycles' },
  { label: 'Team', value: 'Design lead, strategist, motion partner' },
  { label: 'Toolkit', value: 'Tokens, grids, content patterns' }
]

const typeSamples = [
  { label: 'Display', text: 'Design with conviction.', size: '48px / 1.1' },
  { label: 'Heading', text: 'Systems thinking meets craft.', size: '32px / 1.2' },
  { label: 'Body', text: 'Interfaces stay legible and humane across devices.', size: '18px / 1.6' }
]

const colorTokens = [
  { name: 'Night', hex: '#0F172A' },
  { name: 'Cloud', hex: '#E2E8F0' },
  { name: 'Fern', hex: '#34D399' },
  { name: 'Lilac', hex: '#A855F7' },
  { name: 'Citrine', hex: '#FACC15' },
  { name: 'Sand', hex: '#F8FAFC' }
]

const uiShots = [
  {
    title: 'Command center',
    description: 'Adaptive layout with responsive grid and emphasis on clarity.',
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
    tag: 'Web'
  },
  {
    title: 'Mobile rituals',
    description: 'Edge-to-edge cards with tactile micro-interactions for tap targets.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    tag: 'Mobile'
  },
  {
    title: 'Guideline reader',
    description: 'Editorial layouts for governance and onboarding.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    tag: 'Docs'
  }
]

const featureItems = [
  {
    category: 'Identity',
    title: 'Motion grammar',
    description: 'Easing tokens and durations that communicate confidence without friction.',
    tags: ['Easing', 'Durations', 'Microcopy'],
    icon: '⚡'
  },
  {
    category: 'Systems',
    title: 'Grid discipline',
    description: 'Responsive grid primitives that maintain rhythm and whitespace.',
    tags: ['Baseline', 'Columns', 'Stacks'],
    icon: '▦'
  },
  {
    category: 'Product',
    title: 'State logic',
    description: 'Defined hover, focus, empty, and loading states for predictable feedback.',
    tags: ['States', 'Feedback', 'Accessibility'],
    icon: '◎'
  }
]

const statItems = [
  { label: 'Brand recall', value: '+35%', detail: 'Measured across launch markets' },
  { label: 'Design velocity', value: '2.3x', detail: 'Sprint-to-ship acceleration' },
  { label: 'Consistency', value: '94%', detail: 'Reduction in deviation requests' },
  { label: 'Engagement', value: '+18%', detail: 'Lift in priority journeys' }
]
</script>
