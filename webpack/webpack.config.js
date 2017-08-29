var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


var extractCSS = new ExtractTextPlugin('css/[name].css');

var baseConfig = {
  entry: {
    main: './src/app.js'
  },
  output: {
    filename: 'js/main.js',
    path: path.resolve('./build/assets')
  },
  module: {
    rules: [
      {
    	test: /\.css$/,
	        use: extractCSS.extract([ 
	        	'css-loader', 
	        	'postcss-loader' 
	        ])    
	      }
    ]
  },
  plugins: [
    extractCSS
  ]
};

// export configuration
module.exports = baseConfig;