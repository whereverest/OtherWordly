const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const sveltePreprocess = require('svelte-preprocess');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

const isCiBuild = !!process.env.CI
if (!isCiBuild) {
  require('dotenv').config()
}

let mode = 'development';
let target = 'web';

if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  target = 'browserslist';
}

const isDev = mode === 'development';

plugins = () => {
  const pluginsList = [
    new webpack.DefinePlugin({
      IS_DEV_ENV: isDev,
      IS_PROD_ENV: !isDev,
    }),
    new HTMLWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: [''],
      minify: false
    }),
    new HTMLWebpackPlugin({
      template: './src/template.html',
      filename: 'menu.html',
      chunks: ['menu','menu-WKUserScript-atDocumentStart','menu-WKUserScript-atDocumentEnd'],
      minify: false
    }),
    new HTMLWebpackPlugin({
      template: './src/template.html',
      filename: 'firstPlay.html',
      chunks: ['firstPlay'],
      minify: false
    }),
    new HTMLWebpackPlugin({
      template: './src/template.html',
      filename: 'levelBefore.html',
      chunks: ['levelBefore'],
      minify: false
    }),
    new HTMLWebpackPlugin({
      template: './src/template.html',
      filename: 'placements.html',
      chunks: ['placements'],
      minify: false
    }),
    new HTMLWebpackPlugin({
      template: './src/template.html',
      filename: 'levelAfter.html',
      chunks: ['levelAfter'],
      minify: false
    }),
    new HTMLWebpackPlugin({
      template: './src/template.html',
      filename: 'pause.html',
      chunks: ['pause'],
      minify: false
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CleanWebpackPlugin()
  ];
  
  // if (!isDev) {
  //   pluginsList.push( new CleanWebpackPlugin() );
  // }

  return pluginsList
};


module.exports = {
  mode: mode,
  target: target,
  
  entry: {
    'menu-WKUserScript-atDocumentStart': ['./src/start.js'],
    'menu-WKUserScript-atDocumentEnd': ['./src/end.js'],
    'menu': ['./src/apps/menu/main.js'],
    'firstPlay': ['./src/apps/firstPlay/main.js'],
    'levelBefore': ['./src/apps/levelBefore/main.js'],
    'levelAfter': ['./src/apps/levelAfter/main.js'],
    'pause': ['./src/apps/pause/main.js'],
    'placements': ['./src/apps/placements/main.js']
  },

  output: {
    path: isDev ? path.join(__dirname, 'dist-dev') : path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: 'auto',
    assetModuleFilename: 'menu-image-[name][ext]'
  },

  optimization: {
    minimize: false
  },
  
  resolve: {
    alias: {
      svelte: path.dirname(require.resolve('svelte/package.json')),
      '@': path.resolve(__dirname, './src'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@stores-m': path.resolve(__dirname, './src/apps/menu/stores'),
      '@stores-fp': path.resolve(__dirname, './src/apps/firstPlay/stores'),
      '@stores-ps': path.resolve(__dirname, './src/apps/pause/stores'),
      '@stores-lb': path.resolve(__dirname, './src/apps/levelBefore/stores'),
      '@stores-lp': path.resolve(__dirname, './src/apps/placements/stores'),
      '@stores-la': path.resolve(__dirname, './src/apps/levelAfter/stores'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@images': path.resolve(__dirname, './src/assets/images'),
      '@icons': path.resolve(__dirname, './src/assets/icons'),
      '@pages-m': path.resolve(__dirname, './src/apps/menu/pages'),
      '@pages-fp': path.resolve(__dirname, './src/apps/firstPlay/pages'),
      '@pages-ps': path.resolve(__dirname, './src/apps/pause/pages'),
      '@pages-lb': path.resolve(__dirname, './src/apps/levelBefore/pages'),
      '@pages-la': path.resolve(__dirname, './src/apps/levelAfter/pages'),
      '@pages-lp': path.resolve(__dirname, './src/apps/placements/pages'),
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  
  module: {
    rules: [
      {
        test: /(?<!\.font)\.svg$/i,
        type: 'asset/source'
      },
      {
        test: /(\.font)\.svg$/i,
        // type: isDev ? 'asset/resource' : 'asset/inline'
        type: 'asset/resource'
      },
      {
        test: /\.(eot|ttf|otf|woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
        }
      },
      {
        test: /(\.integrated)\.svg$/i,
        type: 'asset/inline',
      },
      { // INTEGRATED
        test: /(\.integrated)\.(png|jpe?g|gif)$/i,
        type: 'asset/inline',
      },
      { // NOT INTEGRATED
        test: /(?<!\.integrated)\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
        // parser: {
        //   dataUrlCondition: {
        //     // maxSize: isDev ? 0 : (500 * 1024)
        //     maxSize: 0
        //   }
        // },
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sass|scss|css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'expanded'
              }
            }
          }
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        // required to prevent errors from Svelte on Webpack 5+
        test: /node_modules\/svelte\/.*\.mjs$/i,
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.svelte$/i,
        use: {
          loader: 'svelte-loader',
          options: {
            compilerOptions: {
              dev: isDev
            },
            emitCss: true,
            hotReload: isDev,
            preprocess: sveltePreprocess()
          }
        }
      }
    ]
  },
  
  plugins: plugins(),
  
  devtool: isDev ? 'eval-source-map' : false,
  
  devServer: {
    hot: true,
    host: '192.168.6.217',
    port: 5000,
    writeToDisk: true,
    disableHostCheck: true
  }
};
