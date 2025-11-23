// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/fonts", "@nuxt/image"],
  css: ["./app/assets/css/main.css", "@fortawesome/fontawesome-svg-core/styles.css"],
  app: {
    head: {
      titleTemplate: "%s | YK",
      link: [{ rel: "icon", type: "image/svg+xml", href: "/YLogo.svg", sizes: "any" }],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
});
