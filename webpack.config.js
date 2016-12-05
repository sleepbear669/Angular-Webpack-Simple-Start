const path                     = require('path');
const CommonsChunkPlugin       = require('webpack/lib/optimize/CommonsChunkPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const DefinePlugin             = require('webpack/lib/DefinePlugin');

const ENV  = process.env.NODE_ENV = 'development';
const PORT = process.env.PORT || 8080;

const metadata = {
  env : ENV,
  port: PORT
};

module.exports = {
  devServer: {
    contentBase: 'src',
    //historyApiFallback: true,
    port: metadata.port
  },
  devtool: 'source-map',
  entry: {
    'main'  : './src/main.ts'
  },
  module: {
    loaders: [
      {test: /\.css$/,  loader: 'raw-loader', exclude: /node_modules/},
      {test: /\.css$/,  loader: 'style!css?-minimize', exclude: /src/},
      {test: /\.html$/, loader: 'raw-loader'},
      {test: /\.ts$/,   loaders: [
        {loader: 'ts-loader', query: {compilerOptions: {noEmit: false}}},
        {loader: 'angular2-template-loader'}
      ]}
    ]
  },
  output: {
    path    : path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new DefinePlugin({'webpack': {'ENV': JSON.stringify(metadata.env)}})
  ],
  resolve: {
    extensions: ['.ts', '.js']
  }
};