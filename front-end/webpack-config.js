var path = require('path');
module.exports = {
  entry: './App.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: { rules: [ 
    

    { test: /\.json$/, exclude: /(node_modules)/, use: 'json-loader' },

    {
     test: /\.js$/, exclude: /(node_modules|bower_components)/, use: 
     { loader: 'babel-loader', options: 
     { presets: ['env', 'react'] } } } ] } 
    };
  