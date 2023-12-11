import { test, expect } from 'vitest'
import {
	getOptimalImgFormatByAccept,
	getOptimalImgFormatByAgent,
} from '../src/index'

test('getOptimalImgFormatByAgent', async () => {
	// mac safari
	expect(
		getOptimalImgFormatByAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
		),
	).toBe('avif')
	expect(
		getOptimalImgFormatByAgent(
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
			['webp'],
		),
	).toBe('webp')

	// iphone safari
	expect(
		getOptimalImgFormatByAgent(
			'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
		),
	).toBe('avif')

	// iphone wechat
	expect(
		getOptimalImgFormatByAgent(
			'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.44(0x18002c29) NetType/WIFI Language/zh_CN',
		),
	).toBe('avif')
})

test('getOptimalImgFormatByAccept', async () => {
	expect(
		getOptimalImgFormatByAccept(
			'text/html,application/xhtml+xml,application/xml;q=0.9,*/*',
		),
	).toBe(undefined)

	expect(
		getOptimalImgFormatByAccept(
			'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*',
		),
	).toBe('webp')

	expect(
		getOptimalImgFormatByAccept(
			'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*',
		),
	).toBe('avif')

	expect(
		getOptimalImgFormatByAccept(
			'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*',
			['webp'],
		),
	).toBe('webp')
})
