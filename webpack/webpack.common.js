const path = require('path');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

const babelOptions = require('./babel.config');

const libifyOptions = process.env.NODE_ENV === 'production' ? [{
  loader: require.resolve('./libify.js'),
  options: {
    replace: sourcePath => sourcePath.replace(/src/, /dist/),
    publicPath: '/statics/',
  }
}]:[];

const config = {
  entry: [
    path.resolve(__dirname, '../src/client/render.tsx'),
  ],
  output: {
    path: path.resolve(__dirname, '../dist/statics'),
    filename: '[name].js',
    publicPath: '/statics/',
    chunkFilename: '[name].js'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  resolve: {
    extensions: ['.js','.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: [{
        loader: "babel-loader",
        options: babelOptions,
      }, {
        loader: 'ts-loader',
        options: {
          configFile: 'webpack/tsconfig.json'
        }
      }],
      exclude: /node_modules/,
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: babelOptions,
      }]
    },
    {
      test: /\.css$/,
      use: ExtractCssChunks.extract({
        use: libifyOptions.concat({
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[name]-[local]-[hash:base64:5]'
          }
        }),
      })
    }, {
      test: /\.(jpg|png)$/,
      use: libifyOptions.concat({
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }),
    }, {
      test: /\.(html|txt)$/,
      use: libifyOptions.concat({
        loader: 'raw-loader',
      }),
    }]
  },
  plugins: [
    new ExtractCssChunks({
      filename: "[name].css",
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
      filename: '[name].js',
      minChunks: Infinity
    }),
  ],
};

module.exports = config;
