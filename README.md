# optimal-img-format

[![Npm](https://badgen.net/npm/v/optimal-img-format)](https://www.npmjs.com/package/optimal-img-format)
[![Bundlephobia](https://badgen.net/bundlephobia/minzip/optimal-img-format)](https://bundlephobia.com/result?p=optimal-img-format)
[![Coverage](https://img.shields.io/codecov/c/github/lbb00/optimal-img-format.svg)](https://codecov.io/gh/lbb00/optimal-img-format)
![Typescript](https://img.shields.io/badge/TS-Typescript-blue)
[![License](https://img.shields.io/github/license/lbb00/optimal-img-format.svg)](https://github.com/lbb00/optimal-img-format/blob/master/LICENSE)
[![Npm download](https://img.shields.io/npm/dw/optimal-img-format.svg)](https://www.npmjs.com/package/optimal-img-format)

> Get optimal image format on the browser or server.

- Support for AVIF, WebP and JPEG XL
- Zero dependency
- Fast, using promise singleton and cache for detecting

[Online demo](https://lbb00-OptimalImgFormatDemo.web.val.run)

## Usage

### Install

```bash
npm install optimal-img-format
```

### Formats

Formats refer to the subtypes of the MIME type `images/*`.

- jxl
- avif
- webp

### Browser

```javascript
import {
  getOptimalImgFormatOnBrowser,
  isSupportWebP,
} from "optimal-img-format";

const format = await getOptimalImgFormatOnBrowser(["avif", "webp"]);
const formatWebp = await isSupportWebP();
```

Detecting browser supports from:

- [ImageDecoder.isTypeSupported](https://developer.mozilla.org/en-US/docs/Web/API/ImageDecoder/isTypeSupported_static)
- <https://avif.io/blog/tutorials/css/#avifsupportdetectionscript>

### Server

```javascript
import {
  getOptimalImgFormatByAccept,
  getOptimalImgFormatByAgent,
} from "optimal-img-format";

const format =
  getOptimalImgFormatByAccept(request.headers.accept, ["avif", "webp"]) ||
  getOptimalImgFormatByAgent(request.headers.agent, ["avif", "webp"]);
```

## Changelog

[CHANGELOG](./CHANGELOG.md)

## Contributions

If you have any suggestions for this project or discover a bug, please raise an [Issue](https://github.com/lbb00/optimal-img-format/issues).

## License

[UNLICENSE](./LICENSE)
