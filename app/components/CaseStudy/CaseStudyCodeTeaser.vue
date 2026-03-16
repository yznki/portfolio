<script setup lang="ts">
const props = defineProps<{
  filename: string;
  language: string;
  code: string;
  description: string;
}>();

// Basic syntax highlighting: returns HTML string
const highlighted = computed(() => {
  let html = props.code
    // Escape HTML entities first
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Comments (// ...) — must be before other replacements to avoid double-processing
  html = html.replace(
    /(\/\/.*$)/gm,
    '<span style="color: rgba(255,255,255,0.28); font-style: italic">$1</span>'
  );

  // String literals ('...', "...")
  html = html.replace(
    /(['"])((?:(?!\1).)*)\1/g,
    '<span style="color: #86efac">$1$2$1</span>'
  );

  // Keywords
  html = html.replace(
    /\b(export|const|type|interface|import|from|as|return|function|class|extends|implements|default|of|in|if|else|for|while|async|await)\b/g,
    '<span style="color: #a6a9f9; font-weight: 600">$1</span>'
  );

  // Object keys (word before colon, inside object literals)
  html = html.replace(
    /\b([a-z_][a-zA-Z0-9_]*)(?=\s*:(?!:))/g,
    '<span style="color: rgba(255,255,255,0.7)">$1</span>'
  );

  return html;
});

const copied = ref(false);

function copy() {
  navigator.clipboard.writeText(props.code).then(() => {
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  });
}
</script>

<template>
  <div class="rounded-xl border border-white/10 overflow-hidden">
    <!-- Title bar -->
    <div
      class="flex items-center justify-between px-4 py-3 bg-secondary-600/60 border-b border-white/[0.07]"
    >
      <div class="flex items-center gap-3">
        <!-- Traffic lights -->
        <div class="flex gap-1.5">
          <span class="h-3 w-3 rounded-full bg-white/8" />
          <span class="h-3 w-3 rounded-full bg-white/8" />
          <span class="h-3 w-3 rounded-full bg-white/8" />
        </div>
        <span class="text-xs text-white/35 font-mono">{{ filename }}</span>
      </div>
      <button
        class="text-xs text-white/30 hover:text-white/60 transition-colors duration-200 cursor-pointer font-mono"
        @click="copy"
      >
        {{ copied ? "copied!" : "copy" }}
      </button>
    </div>

    <!-- Description -->
    <div class="px-5 py-3 bg-secondary-600/30 border-b border-white/[0.05]">
      <p class="text-xs text-white/50 leading-relaxed">{{ description }}</p>
    </div>

    <!-- Code -->
    <div class="overflow-x-auto bg-secondary-600/20">
      <pre
        class="px-5 py-5 text-sm font-mono leading-relaxed text-white/75 whitespace-pre"
        v-html="highlighted"
      />
    </div>
  </div>
</template>
