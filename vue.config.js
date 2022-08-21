const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '.',
  productionSourceMap: false,
  indexPath: 'index.php',
  transpileDependencies: [
    'vuetify'
  ]
})
