const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    'deal-with-firebase-bundle': './assets/js/deal-with-firebase.js',
    'fetching-bundle': './assets/js/fetching.js',
    'fetchingSingleEstate-bundle': './assets/js/fetchSingleEstate.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  watch: true
}

