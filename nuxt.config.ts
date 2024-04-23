// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    devtools: { enabled: false },

    vite: {
        build: {
            rollupOptions: {
                output: {
                    manualChunks: (id) => {
                        if (id.includes("/node_modules/@bryntum/grid/")) {
                            return "bryntum-grid";
                        }
                        if (id.includes("/node_modules/@bryntum/grid-vue-3/")) {
                            return "bryntum-grid-vue3";
                        }
                    }
                }
            }
        },
        vue: {
            template: {
                compilerOptions: {
                    // treat all tags from Union Investments library with a 'sd-' prefix as custom elements
                    isCustomElement: (tag) => tag.includes('sd-')
                }
            }
        },
        optimizeDeps: {
            include: ['@bryntum/grid', '@bryntum/grid-vue-3']
        }
    },
})
