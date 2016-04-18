// Load env file
var envFile = require('node-env-file');
var webpack = require('webpack');
envFile(__dirname + '/../.env');

// Check if we're bundling production or not
if (process.env.NODE_ENV === "production") {
  console.log("USING PRODUCTION KEY");
  var key = process.env.STRIPE_LIVE_PUBLIC;
} else {
  var key = process.env.STRIPE_TEST_PUBLIC;
}

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + '/dist/',
    publicPath: '/dist/',
    filename: 'app.js'
  },
  module: {
    loaders: [
      // Babel
      {
        exclude: /node_modules/,
        loader: 'babel'
      },
      // LESS for ElementalUI
      {
        test: /\.less$/,
        loader: "style!css!less"
      },
      // Image loading
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.STRIPE_KEY': "'" + key + "'",
      'process.env.BADGE': "'" + process.env.BADGE + "'",
      'process.env.NAME': "'" + process.env.NAME + "'",
      'process.env.SERVICE_NAME': "'" + process.env.SERVICE_NAME + "'",
      'process.env.CURRENCY_TYPE': "'" + process.env.CURRENCY_TYPE + "'",
      'process.env.SERVICE': "'" + process.env.SERVICE + "'",
    }),
  ]
};
