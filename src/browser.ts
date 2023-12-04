import type { ImgFormat } from "./constants"
import { OPTIMAL_FORMATS_DEFAULT } from "./constants"

function loadImage(src: string) {
	return new Promise<HTMLImageElement>((resolve, reject) => {
		const img = new Image()
		img.src = src
		img.onload = () => {
			resolve(img)
		}
		img.onerror = reject
	})
}

async function checkSupportAVIF() {
	try {
		await loadImage(
			"data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=",
		)
		return true
	} catch (e) {
		return false
	}
}

async function checkSupportWebP() {
	try {
		const img = await loadImage(
			"data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
		)
		return img.width > 0 && img.height > 0
	} catch (e) {
		return false
	}
}

const formatSupportMap: Record<ImgFormat, () => Promise<boolean>> = {
	avif: checkSupportAVIF,
	webp: checkSupportWebP,
}

export async function getOptimalImgFormatOnBrowser(
	optimalFormats: ImgFormat[] = OPTIMAL_FORMATS_DEFAULT,
) {
	const results = await Promise.all(
		optimalFormats.map((format) => formatSupportMap[format]?.()),
	)
	return optimalFormats[results.findIndex(Boolean)]
}
