const path = require('path')
const { MedusaPlugin } = require('@medusa-frontends/webpack-plugin')

const env = {
  production: process.env.NODE_ENV === 'production',
  development: process.env.NODE_ENV === 'development',
}

const config = {
  mode: env.production ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    host: 'localhost',
    port: 3001,
  },
  plugins: [
    new MedusaPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}

module.exports = config
