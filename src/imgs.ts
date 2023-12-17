// https://avif.io/blog/tutorials/css/#avifsupportdetectionscript
export const AVIF_BASE64 =
	'AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A='

// https://avif.io/blog/tutorials/css/#avifsupportdetectionscript
export const WEBP_BASE64 = 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA=='

// 1x1 #000 pixel
export const JXL_BASE64 =
	'/woAEBAJAagAcTAAAFSojDJu8HKu58sPHRbTNq4ztNW2hSWMzfbCICGh1Bi7wXCsoZIE'

export function getDataUrlFromBase64(base64: string, format: string) {
	return `data:image/${format};base64,` + base64
}
