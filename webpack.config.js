const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './js/script.js',
    catalog: './js/catalog.js',
    basket: './js/bascket.js',
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/i,  // Обработка изображений
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]',  // Сохранение изображений в папку dist/img
        },
      },
      {
        test: /\.html$/i,  // Обработка HTML-файлов
        use: [
          {
            loader: 'html-loader',  // Загружает HTML и распознает ресурсы
            options: {
              sources: {
                list: [
                  {
                    tag: 'img',
                    attribute: 'src',
                    type: 'src',
                  },
                  {
                    tag: 'link',
                    attribute: 'href',
                    type: 'src',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',  // Основной HTML файл
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      filename: 'catalog.html',
      template: './card/index.html',
      chunks: ['catalog'],
    }),
    new HtmlWebpackPlugin({
      filename: 'basket.html',
      template: './bascket/index.html',
      chunks: ['basket'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],

  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    open: true,
  },

  mode: 'development',
};
