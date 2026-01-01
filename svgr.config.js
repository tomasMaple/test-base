module.exports = {
  typescript: true,
  jsxRuntime: 'automatic',
  icon: true,
  replaceAttrValues: {
    '#000': 'currentColor',
    '#000000': 'currentColor',
    'black': 'currentColor',
  },
  svgProps: {
    fill: 'currentColor',
    'aria-hidden': 'true',
  },
  svgoConfig: {
    plugins: [
      { name: 'removeViewBox', active: false },
      { name: 'removeDimensions', active: true },
    ],
  },
};
