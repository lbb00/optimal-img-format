import { test, expect } from 'vitest'
import { getOptimalImgFormatOnBrowser } from '../src/index'

test('getOptimalImgFormatOnBrowser', async () => {
  expect(await getOptimalImgFormatOnBrowser(['webp'])).toBe('webp')
  expect(await getOptimalImgFormatOnBrowser(['avif'])).toBe('avif')
  expect(await getOptimalImgFormatOnBrowser(['avif', 'webp'])).toBe('avif')
  expect(await getOptimalImgFormatOnBrowser(['webp', 'avif'])).toBe('webp')
})
