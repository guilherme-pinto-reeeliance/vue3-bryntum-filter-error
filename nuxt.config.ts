// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    devtools: { enabled: false },

    vite: {
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
