import { test, expect } from 'vitest'
import { getOptimalImgFormatOnBrowser } from '../src/index'

async function testGroup({ force = false } = {}) {
	expect(await getOptimalImgFormatOnBrowser(['avif'], { force })).toBe('avif')
	expect(await getOptimalImgFormatOnBrowser(['webp'], { force })).toBe('webp')
	expect(await getOptimalImgFormatOnBrowser(['jxl'], { force })).toBe(undefined)
	// @ts-ignore
	expect(await getOptimalImgFormatOnBrowser(['xxx'])).toBe(undefined)
	// @ts-ignore
	expect(await getOptimalImgFormatOnBrowser(['xxx', 'webp', 'avif'])).toBe(
		'webp',
	)
}

test('getOptimalImgFormatOnBrowser', async () => {
	await testGroup()

	// hook ImageDecoder as undefined
	// @ts-ignore
	ImageDecoder = undefined
	await testGroup({ force: true })
})
