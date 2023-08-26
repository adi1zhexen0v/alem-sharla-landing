import dotenv from 'dotenv'
import webpack from 'webpack';

import imageminGifsicle from 'imagemin-gifsicle';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminOptipng from 'imagemin-optipng';
import imageminSvgo from 'imagemin-svgo';

export const paths = {
  src: {
    html: './src/*.html',
    scss: './src/scss/**/*.scss',
    js: './src/js/main.js',
    img: './src/img/**/*'
  },
  build: {
    html: './build/',
    css: './build/css/',
    js: './build/js/',
    img: './build/img/'
  }
}

export const imageminOptions = [
  imageminGifsicle({ interlaced: true }),
  imageminMozjpeg({ quality: 80, progressive: true }),
  imageminOptipng({ optimizationLevel: 5 }),
  imageminSvgo({
    plugins: [
      { removeViewBox: true },
      { cleanupIDs: false }
    ]
  })
];


export const webpackOptions = {
  mode: 'development',
  output: {
    filename: 'script.js'
  },
  watch: false,
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              debug: true,
              corejs: 3,
              useBuiltIns: "usage"
            }]]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env":JSON.stringify(dotenv.config().parsed)
    })
  ]
}