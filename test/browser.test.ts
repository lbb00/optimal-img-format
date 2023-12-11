import { test, expect } from 'vitest'
import { getOptimalImgFormatOnBrowser } from '../src/index'

test('getOptimalImgFormatOnBrowser', async () => {
	expect(await getOptimalImgFormatOnBrowser(['avif', 'webp'])).toBe('avif')
	expect(await getOptimalImgFormatOnBrowser(['webp', 'avif'])).toBe('webp')
	// @ts-ignore
	expect(await getOptimalImgFormatOnBrowser(['xxx'])).toBe(undefined)

	// hook ImageDecoder as undefined
	// @ts-ignore
	ImageDecoder = undefined
	expect(await getOptimalImgFormatOnBrowser(['avif', 'webp'])).toBe('avif')
	expect(await getOptimalImgFormatOnBrowser(['webp', 'avif'])).toBe('webp')
	// @ts-ignore
	expect(await getOptimalImgFormatOnBrowser(['xxx'])).toBe(undefined)
})
