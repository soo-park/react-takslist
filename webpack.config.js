module.exports = {
  entry: "./entry.js",
  output: {
      path: __dirname,
      filename: "bundle.js"
  },
  module: {
      loaders: [
          { test: /\.css$/, loader: "style!css" },
          {
            test: /ui-sortable/,
            use: ['imports-loader?$UI=jquery-ui/ui/widgets/sortable']
          },
          {
            test: /\.js$/,
            exclude: ['node_modules'],
            loader: 'babel',
            query: {
                babelrc: false,
                presets: [
                    ['es2015', { modules: false }],
                ],
            },
          }
      ]
  }
};


