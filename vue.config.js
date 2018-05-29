/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

module.exports = {
  lintOnSave: false,
  pwa: {
    name: 'FDI Vigilancia Ciudadana',
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
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new PrerenderSPAPlugin({
            staticDir: path.join(__dirname, 'dist'),
            routes: [
              '/',
              '/reporte',
              '/derechos',
              '/recursos',
              '/contacto',
              '/espacios',
              '/recursos/recursos-de-denuncia',
              '/recursos/directorio',
            ],
            renderer: new Renderer({
              renderAfterTime: 5000,
            }),
          }),
          new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
        ],
      };
    }
    return {};
  },
};
