const fs = require('fs');
const path = require('path');
var glob = require('glob');
var Mode = require('frontmatter-markdown-loader/mode');

if (!fs.existsSync('aws.json')) {
  console.error(`please run: npm run config:aws`);
  throw `No config file`;
}

// reads the dependencies from the cloudformation stack
const awsConfig = JSON.parse(fs.readFileSync('aws.json'));
function findAWSExport(setting) {
  const envName = process.env.NUXT_ENV_STAGE || 'dev';
  const node = awsConfig.find((n) => n.ExportName === `${setting}-${envName}`);
  if (!node) throw `Setting ${setting} is not known`;

  console.log(setting, ':', node.OutputValue)

  // can be overriden for local development
  if (setting === 'ApiGatewayRestApiId') {
    return process.env.API_URL ||
      `https://${node.OutputValue}.execute-api.eu-west-1.amazonaws.com/${envName}/graphql`;
  }

  return node.OutputValue;
}

async function getDynamicPaths(urlFilepathTable) {
  return [].concat(
    ...Object.keys(urlFilepathTable).map(url => {
      var filepathGlob = urlFilepathTable[url];
      return glob
        .sync(filepathGlob, { cwd: 'content' })
        .map(filepath => `${url}/${path.basename(filepath, '.md')}`);
    })
  );
}

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;1,700&display=swap' },
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#25A6DA', height: '5px' },
  /*
  ** Global SCSS
  */
  css: [
    { src: '@/assets/global.scss', lang: "scss" }
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuelidate.js',
    '@/plugins/swal.ts',
    '@/plugins/tracking.ts',
    '@/plugins/mq.ts'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/gtm',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/sentry',
    // Doc: https://github.com/nuxt-community/apollo-module
    '@nuxtjs/apollo',
    // Doc: https://github.com/nuxt-community/gtm-module
    '@nuxtjs/gtm',
    // Doc: https://github.com/nuxt-community/nuxt-i18n
    [
      'nuxt-i18n',
      {
        seo: true,
        locales: [
          {
            code: 'de',
            iso: 'de',
            isCatchallLocale: true // This one will be used as catchall locale
          },
        ],
        defaultLocale: 'de',
        vueI18n: {
          fallbackLocale: 'de',
          messages: {}
        }
      }
    ],
  ],

  env: {
    region: process.env.DEFAULT_AWS_REGION || 'eu-west-1',
    userPoolId: findAWSExport('CognitoUserPool'),
    identityPoolId: findAWSExport('CognitoIdentityPool'),
    userPoolWebClientId: findAWSExport('CognitoUserPoolClient'),
  },

  /*
  ** Apollo module configuration
  ** See https://github.com/nuxt-community/apollo-module
  */
  apollo: {
    includeNodeModules: true,
    authenticationType: '',
    // optional
    watchLoading: '~/plugins/apollo-watch-loading-handler.js',
    // optional
    errorHandler: '~/plugins/apollo-error-handler.js',
    // required
    clientConfigs: {
      default: {
        httpEndpoint: findAWSExport('ApiGatewayRestApiId'),
        httpLinkOptions: {
          fetchOptions: {
            mode: 'cors'
          },
        },
        persisting: false,
      }
    },
  },
  gtm: {
    // Set to false to disable module in development mode
    dev: false,

    id: process.env.NUXT_GTM_ID,
    layer: 'dataLayer',
    variables: {},

    pageTracking: false,
    autoInit: true,
    respectDoNotTrack: true,

    scriptId: 'gtm-script',
    scriptDefer: false,
    scriptURL: 'https://www.googletagmanager.com/gtm.js',

    noscript: false,
    noscriptId: 'gtm-noscript',
    noscriptURL: 'https://www.googletagmanager.com/ns.html'
  },
  sentry: {
    dsn: '',
    disabled: true,
    disableServerSide: true,
    config: {}, // Additional config
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map';
      }

      // add frontmatter-markdown-loader
      config.module.rules.push({
        test: /\.md$/,
        include: path.resolve(__dirname, "content"),
        loader: "frontmatter-markdown-loader",
        options: {
          mode: [Mode.VUE_COMPONENT, Mode.META]
        }
      });
    },
    // transpile: [/^vue2-google-maps($|\/)/],
    optimizeCSS: {
    },
    transpile: ['vue-clamp', 'resize-detector'],
  },
  generate: {
    routes: async () => {
      const info = await getDynamicPaths({
        '/info': '*.md'
      });

      const register = [
        '/register/demand',
        '/register/demand/company',
        '/register/demand/team',
        '/register/demand/validate',
        '/register/supply',
        '/register/supply/company',
        '/register/supply/team',
        '/register/supply/validate',
      ];

      return [...info, ...register];
    },
  }
}
