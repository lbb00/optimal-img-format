import type { ImgFormat } from './constants'
import {
	getDataUrlFromBase64,
	AVIF_BASE64,
	JXL_BASE64,
	WEBP_BASE64,
} from './imgs'
import { OPTIMAL_FORMATS_DEFAULT } from './constants'

const loadImagePromiseMap: Partial<
	Record<ImgFormat, Promise<HTMLImageElement>>
> = {}
function loadImage(base64Src: string, format: ImgFormat) {
	if (loadImagePromiseMap[format] === undefined) {
		loadImagePromiseMap[format] = new Promise<HTMLImageElement>(
			(resolve, reject) => {
				const img = new Image()
				img.src = getDataUrlFromBase64(base64Src, format)
				img.onload = () => {
					resolve(img)
				}
				img.onerror = reject
			},
		)
	}

	return loadImagePromiseMap[format] as Promise<HTMLImageElement>
}

const cachedSupportMap: Partial<Record<ImgFormat, boolean | undefined>> = {}
async function isSupportWithCacheMap(
	format: ImgFormat,
	imgBase64: string,
	{ force = false } = {},
) {
	if (cachedSupportMap[format] === undefined || force) {
		if (
			typeof ImageDecoder !== 'undefined' &&
			typeof ImageDecoder.isTypeSupported === 'function'
		) {
			try {
				cachedSupportMap[format] = await ImageDecoder.isTypeSupported(
					`image/${format}`,
				)
			} catch (e) {
				cachedSupportMap[format] = false
			}
		} else {
			try {
				const img = await loadImage(imgBase64, format)
				cachedSupportMap[format] = img.width > 0 && img.height > 0
			} catch (e) {
				cachedSupportMap[format] = false
			}
		}
	}
	return cachedSupportMap[format] as boolean
}

export async function isSupportAVIF({ force = false } = {}) {
	return isSupportWithCacheMap('avif', AVIF_BASE64, {
		force,
	})
}

export async function isSupportWebP({ force = false } = {}) {
	return isSupportWithCacheMap('webp', WEBP_BASE64, { force })
}

export async function isSupportJXL({ force = false } = {}) {
	return isSupportWithCacheMap('jxl', JXL_BASE64, { force })
}

const formatSupportMap: Record<
	ImgFormat,
	(opts?: { force?: boolean }) => Promise<boolean>
> = {
	avif: isSupportAVIF,
	webp: isSupportWebP,
	jxl: isSupportJXL,
}

export async function getOptimalImgFormatOnBrowser(
	formats: ImgFormat[] = OPTIMAL_FORMATS_DEFAULT,
	{ force = false } = {},
) {
	const results = await Promise.all(
		formats.map((format) =>
			formatSupportMap[format]?.({
				force,
			}),
		),
	)
	return formats[results.findIndex(Boolean)]
}
