import type { ImgFormat } from './constants'
import { OPTIMAL_FORMATS_DEFAULT } from './constants'

export function getOptimalImgFormatByAccept(
	accept?: string,
	optimalFormats: ImgFormat[] = OPTIMAL_FORMATS_DEFAULT,
) {
	if (typeof accept !== 'string' || accept.length === 0) {
		return
	}

	return optimalFormats.find((format) => {
		if (accept.includes(`image/${format}`)) {
			return true
		}
		return false
	})
}

const iosVersionSupport = {
	webp: (version: number) => version >= 14,
	avif: (version: number) => version >= 16,
	jxl: (version: number) => version >= 17,
}

function checkIOSOptimalFormats(
	version: number,
	optimalFormats: ImgFormat[] = OPTIMAL_FORMATS_DEFAULT,
) {
	return optimalFormats.find((format) => {
		return iosVersionSupport[format](version)
	})
}

export function getOptimalImgFormatByAgent(
	agent?: string,
	optimalFormats: ImgFormat[] = OPTIMAL_FORMATS_DEFAULT,
) {
	if (!agent) return

	const safariVersionMatched = agent.match(/Version\/(\d+).*Safari/i)
	if (safariVersionMatched) {
		const safariVersion = safariVersionMatched[1]
		return checkIOSOptimalFormats(+safariVersion, optimalFormats)
	}

	const appleOSMatched = agent.match(/(iPhone OS) (\d+)/i)
	if (appleOSMatched) {
		const appleOSVersion = appleOSMatched[2]
		return checkIOSOptimalFormats(+appleOSVersion, optimalFormats)
	}
}
