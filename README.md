# React Image
React image component, handling lazy-loading, responsiveness and aspect-ratio.

## Install

To install `react-image` run the following command in your project folder.

```bash
$ npm install --save @born05/react-image
```

## Example

```jsx
import React from 'react';
import Image from '@born05/react-image';

export default class extends React.Component {
  render() {
    return (
      <Image
        width={400}
        height={300}
        color="#ffffff"
        url="https://via.placeholder.com/320x240/&text=Xs"
        urlSm="https://via.placeholder.com/576x432/&text=Sm"
        urlMd="https://via.placeholder.com/768x/576&text=Md"
        urlLg="https://via.placeholder.com/992x744/&text=Lg"
        urlXl="https://via.placeholder.com/1200x900/&text=Xl"
        focalPoint={{ x: 0.5, y: 0.5 }}
        title="Alternative text"
      />
    );
  }
}
```

## Features

- Lazy-loading (shows an empty gif by default)
- SrcSet with pre-defined breakpoints
- Aspect ratio support using width and height (fluid allows for overriding ratio)
- FocalPoint for positioning when not using ratio
- Shows fallback color when not loaded

## License

Copyright © 2019 [Born05](https://www.born05.com/)

See [license](https://github.com/born05/react-image/blob/master/LICENSE.md)
