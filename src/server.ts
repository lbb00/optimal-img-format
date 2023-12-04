import type { ImgFormat } from "./constants"
import { OPTIMAL_FORMATS_DEFAULT } from "./constants"

const ImgFormatAcceptMap: Record<ImgFormat, string> = {
	avif: "image/avif",
	webp: "image/webp",
}

export function getOptimalImgFormatByAccept(
	accept?: string,
	optimalFormats: ImgFormat[] = OPTIMAL_FORMATS_DEFAULT,
) {
	if (typeof accept !== "string" || accept.length === 0) {
		return
	}

	return optimalFormats.find((format) => {
		if (accept.includes(ImgFormatAcceptMap[format])) {
			return true
		}
		return false
	})
}

export const ImgFormatAgentMap = {
	avif: {
		safari: (version: number) => version > 16,
		appleOS: (version: number) => version > 16,
	},
	webp: {
		safari: (version: number) => version > 14,
		appleOS: (version: number) => version > 14,
	},
}

export function getOptimalImgFormatByAgent(
	agent?: string,
	optimalFormats: ImgFormat[] = OPTIMAL_FORMATS_DEFAULT,
) {
	if (!agent) return

	const safariVersionMatched = agent.match(/Version\/(\d+).*Safari/i)
	if (safariVersionMatched) {
		const safariVersion = safariVersionMatched[1]
		return optimalFormats.find((format) => {
			return ImgFormatAgentMap[format].safari(+safariVersion)
		})
	}

	const appleOSMatched = agent.match(/(iPhone OS) (\d+)/i)
	if (appleOSMatched) {
		const appleOSVersion = appleOSMatched[2]
		return optimalFormats.find((format) => {
			return ImgFormatAgentMap[format].appleOS(+appleOSVersion)
		})
	}
}
