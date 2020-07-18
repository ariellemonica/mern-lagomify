const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public', 'dist')
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin(
      {
        'process.env.NODE_ENV': '"development"',
        'global.GENTLY': false
      }
    ),
  ],
  node: {
    __dirname: true,
  } 
};

plugins.push(new webpack.DefinePlugin({ "global.GENTLY": false }));

module.exports = config