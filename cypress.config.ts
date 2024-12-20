import { defineConfig } from 'cypress'
import path from 'path'

export default defineConfig({
    component: {
        supportFile: false,
        indexHtmlFile:"./src/cypress/index.html",
        devServer: {
            framework: 'next',
            bundler: 'webpack',
            webpackConfig: {
                resolve: {
                    alias: {
                        '@/jobApp/*': path.resolve(__dirname, './src/*'),
                    },
                }
            }
        },
        specPattern: './src/**/*.cy.{js,jsx,ts,tsx}',
    },

})