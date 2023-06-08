module.exports = {
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://8.130.95.141:3200',
        changeOrigin: true,
      },
    },
  },
  
 
}
