<script setup lang="ts">
  import { computed, ref } from "vue"
  import { cva } from "class-variance-authority"

  interface ProjectCardProps {
    /**
     * Path to the project image to display on hover
     */
    projectImage: string

    /**
     * URL to the project's page
     */
    projectUrl: string

    /**
     * Project logo image for card and cursor customization
     */
    logoSrc?: string
  }

  const props = defineProps<ProjectCardProps>()

  const isHovering = ref<boolean>(false)

  const cardClasses = cva(
    "relative flex items-center justify-center overflow-hidden rounded-lg transition-transform duration-300 cursor-pointer",
    {
      variants: {
        hovering: {
          true: "bg-cover bg-center transform scale-105",
          false: "",
        },
      },
    },
  )

  const defaultBgClasses = cva("absolute inset-0 transition-opacity duration-300", {
    variants: {
      hovering: {
        true: "opacity-0",
        false: `bg-background`,
      },
    },
  })

  const backgroundStyle = computed(() => ({
    cursor: isHovering.value && props.logoSrc ? `url('${props.logoSrc}'), auto` : "auto",
    backgroundImage: isHovering.value ? `url('${props.projectImage}')` : "none",
  }))

  function goToProjectPage() {
    window.open(props.projectUrl, "_blank")
  }
</script>

<template>
  <div
    :class="cardClasses"
    @mouseover="isHovering = true"
    @mouseleave="isHovering = false"
    @click="goToProjectPage"
    :style="backgroundStyle"
  >
    <div v-if="!isHovering" :class="defaultBgClasses"></div>
  </div>
</template>
