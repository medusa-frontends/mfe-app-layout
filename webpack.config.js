const path = require('path')
const { ModuleFederationPlugin } = require('webpack').container

class MFEPlugin extends ModuleFederationPlugin {
  constructor() {
    // eslint-disable-next-line import/no-unresolved
    const pluginOptions = require('./.mfe/plugin-options.json')
    super(pluginOptions)
  }
}

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
  plugins: [new MFEPlugin()],
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
