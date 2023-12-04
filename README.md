# img-format-optimal

[![Npm](https://badgen.net/npm/v/optimal-img-format)](https://www.npmjs.com/package/optimal-img-format)
[![Bundlephobia](https://badgen.net/bundlephobia/minzip/optimal-img-format)](https://bundlephobia.com/result?p=optimal-img-format)
[![Coverage](https://img.shields.io/codecov/c/github/lbb00/optimal-img-format.svg)](https://codecov.io/gh/lbb00/optimal-img-format)
[![License](https://img.shields.io/github/license/lbb00/optimal-img-format.svg)](https://github.com/lbb00/optimal-img-format/blob/master/LICENSE)
[![Npm download](https://img.shields.io/npm/dw/optimal-img-format.svg)](https://www.npmjs.com/package/optimal-img-format)

> Get optimal image format on the browser or server.

## Usage

### install

```bash
npm install img-format-optimal
```

### Browser

```javascript
import { getOptimalImgFormatOnBrowser } from 'optimal-img-format'

const format = await getOptimalImgFormatOnBrowser(['avif', 'webp'])
```

### Server

```javascript
import { getOptimalImgFormatByAccept, getOptimalImgFormatByAgent } from 'optimal-img-format'

const format =
  getOptimalImgFormatByAccept(request.headers.accept, ['avif', 'webp']) ||
  getOptimalImgFormatByAgent(request.headers.agent, ['avif', 'webp'])
```

## Contributions

If you have any suggestions for this project or discover a bug, please raise an [Issue](https://github.com/lbb00/optimal-img-format/issues).

## License

![MIT License](./LICENSE)
