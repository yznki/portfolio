<script setup lang="ts">
const props = defineProps<{
  filename: string;
  language: string;
  code: string;
  description: string;
}>();

// ── Syntax highlighting ──────────────────────────────────────────────────────
// Process line-by-line so comment lines are short-circuited before any other
// regex can match inside the injected span attributes.
const highlighted = computed(() => {
  return props.code
    .split("\n")
    .map((raw) => {
      // Escape HTML entities
      let line = raw
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // Comment line — wrap entirely and skip all other passes
      if (line.trimStart().startsWith("//")) {
        return `<span class="tok-comment">${line}</span>`;
      }

      // String literals
      line = line.replace(
        /(['"])((?:(?!\1)[^])*?)\1/g,
        '<span class="tok-string">$1$2$1</span>'
      );

      // Keywords
      line = line.replace(
        /\b(export|const|let|var|type|interface|import|from|as|return|function|class|extends|implements|default|of|in|if|else|for|while|async|await|keyof|typeof|unknown|void|boolean|string|number)\b/g,
        '<span class="tok-keyword">$1</span>'
      );

      // Capitalised identifiers → component / type names
      line = line.replace(
        /\b([A-Z][a-zA-Z0-9_]*)\b/g,
        '<span class="tok-type">$1</span>'
      );

      // Object keys (word immediately followed by colon, not ::)
      line = line.replace(
        /\b([a-z_][a-zA-Z0-9_]*)(?=\s*:(?!:))/g,
        '<span class="tok-key">$1</span>'
      );

      return line;
    })
    .join("\n");
});

// ── Line numbers ─────────────────────────────────────────────────────────────
const lines = computed(() => props.code.split("\n"));
const highlightedLines = computed(() => highlighted.value.split("\n"));

// ── Copy ─────────────────────────────────────────────────────────────────────
const copied = ref(false);
function copy() {
  navigator.clipboard.writeText(props.code).then(() => {
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  });
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Description callout -->
    <div
      class="flex gap-4 rounded-xl border border-primary-500/20 bg-primary-500/[0.06] px-5 py-4"
    >
      <div class="mt-0.5 flex-shrink-0">
        <div
          class="h-6 w-6 rounded-md bg-primary-500/20 flex items-center justify-center"
        >
          <FontAwesomeIcon icon="fa-code" class="text-primary-400 text-[10px]" />
        </div>
      </div>
      <p class="text-sm text-white/60 leading-relaxed">{{ description }}</p>
    </div>

    <!-- Code block -->
    <div class="rounded-xl border border-white/[0.08] overflow-hidden">
      <!-- Title bar -->
      <div
        class="flex items-center justify-between px-4 py-2.5 bg-[#1a1a2e] border-b border-white/[0.07]"
      >
        <div class="flex items-center gap-3">
          <!-- macOS traffic lights -->
          <div class="flex gap-1.5">
            <span class="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span class="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span class="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <span class="text-[11px] text-white/35 font-mono tracking-wide">{{ filename }}</span>
        </div>
        <div class="flex items-center gap-3">
          <span
            class="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-white/10 text-white/25"
          >
            {{ language }}
          </span>
          <button
            class="text-[11px] text-white/30 hover:text-white/70 transition-colors duration-150 font-mono cursor-pointer"
            @click="copy"
          >
            {{ copied ? "✓ copied" : "copy" }}
          </button>
        </div>
      </div>

      <!-- Code with line numbers -->
      <div class="overflow-x-auto bg-[#0f0f1a] pt-3 pb-3">
        <table class="w-full border-collapse">
          <tbody>
            <tr v-for="(line, i) in lines" :key="i" class="group/line">
              <td
                class="select-none text-right pr-4 pl-5 py-0 text-[12px] font-mono text-white/[0.18] w-10 align-top leading-6 group-hover/line:text-white/30 transition-colors"
                style="min-width: 2.5rem"
              >
                {{ i + 1 }}
              </td>
              <td class="pl-2 pr-6 py-0 align-top">
                  <span
                  class="block text-[13px] font-mono leading-6 whitespace-pre"
                  v-html="highlightedLines[i] || '&nbsp;'"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Token colours — VS Code Dark+ inspired */
:deep(.tok-comment) {
  color: #6a9955;
  font-style: italic;
}
:deep(.tok-string) {
  color: #ce9178;
}
:deep(.tok-keyword) {
  color: #569cd6;
  font-weight: 600;
}
:deep(.tok-type) {
  color: #4ec9b0;
}
:deep(.tok-key) {
  color: rgba(255, 255, 255, 0.65);
}

/* Hover highlight on a line */
tr.group\/line:hover td {
  background: rgba(255, 255, 255, 0.025);
}
</style>
