import { copyFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
	root: '.',
	mode: 'production',
	build: {
		target: 'esnext',
		outDir: './dist',
		minify: 'terser',
		lib: {
			entry: './src/index.ts',
			formats: ['es', 'cjs', 'umd'],
			name: 'OptimalImgFormat',
			fileName: (format) => {
				switch (format) {
					case 'es':
						return 'index.mjs'
					case 'umd':
						return 'index.umd.js'
					default:
						return 'index.js'
				}
			},
		},
	},
	plugins: [
		dts({
			logLevel: 'warn',
			rollupTypes: true,
			include: ['src'],
			afterBuild: () => {
				copyFileSync('dist/index.d.ts', 'dist/index.d.mts')
			},
		}),
	],
})
