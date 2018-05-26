module.exports = {
  lintOnSave: false,
  pwa: {
    name: 'FDI No más discriminación',
    themeColor: '#ffc233',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      exclude: [
        /\.map$/,
        /img\/icons\//,
        /favicon\.ico$/,
        /manifest\.json$/,
        /CNAME$/,
        /404\.html$/,
      ],
    },
  },
};
