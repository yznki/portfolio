<script setup lang="ts">
import { cva } from "class-variance-authority";

export interface ActionButtonProps {
  /**
   * The icon to show on the action button.
   */
  icon?: string | [string, string];

  /**
   * The text to show on the action button
   */
  label?: string;

  /**
   * The action to carry out on click.
   */
  onClick?: () => void;

  /**
   * Indicates whether the action button should be disabled or not.
   */
  disabled?: boolean;

  /**
   * The intent of the action button.
   */
  intent?: "primary" | "accent" | "secondary" | "tertiary";

  /**
   * Whether the button should take the full width of its container.
   */
  fullWidth?: boolean;
}

withDefaults(defineProps<ActionButtonProps>(), {
  disabled: false,
  intent: "primary",
});

const buttonStyles = cva(
  "inline-flex gap-2 items-center justify-center rounded-lg px-4 py-2 ease-in-out transition-colors duration-500 cursor-pointer",
  {
    variants: {
      intent: {
        primary: "bg-primary-500 hover:bg-primary-300 active:bg-primary-700 text-white",
        accent: "bg-accent-500 hover:bg-accent-300 active:bg-accent-700 text-white",
        secondary: "bg-secondary-500 hover:bg-secondary-300 active:bg-secondary-700 text-white",
        tertiary:
          "border border-primary-500 text-primary-500 hover:bg-primary-500 hover:bg-opacity-20 active:bg-primary-700 hover:text-white",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
  }
);
</script>

<template>
  <span>
    <button
      :class="buttonStyles({ intent: intent, disabled: disabled, fullWidth: fullWidth })"
      @click="onClick"
      :disabled="disabled"
    >
      <span v-if="icon">
        <FontAwesomeIcon :icon="icon" />
      </span>
      <span v-if="label">{{ label }}</span>
    </button>
  </span>
</template>
