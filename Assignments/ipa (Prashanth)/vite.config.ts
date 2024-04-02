/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        reporters: ['verbose'],
        setupFiles: ['./vitest.setup.ts'],
        environment: 'jsdom',
        deps: {
            optimizer: {
                web: {
                    include: ['vitest-canvas-mock'],
                }
            }
        },
        environmentOptions: {
            jsdom: {
                resources: 'usable',
            },
        },
        testTimeout: 60000,
    },
})
