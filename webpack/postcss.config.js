module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-import-url': {},
    'rucksack-css': {},
    'postcss-cssnext': {
		browsers: ['last 2 versions', '> 5%'],
    },
    'cssnano': {
		autoprefixer: false,
		discardComments: ['removeAll', 'true'],
    },
  },
};
