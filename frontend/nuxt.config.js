const fs = require('fs');
const path = require('path');
const glob = require('glob');
const Mode = require('frontmatter-markdown-loader/mode');
const version = require('./package.json').version;

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
    title: 'JOWOMO: Deine Plattform für Personalpartnerschaften',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no, initial-scale=1, viewport-fit=cover' },
      { name: 'apple-mobile-web-app-title', content: 'JOWOMO: Deine Plattform für Personalpartnerschaften' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { hid: 'description', name: 'description', content: 'JOWOMO vernetzt Unternehmen mit freien Arbeitnehmerkapazitäten und Unternehmen mit aktuellem Mehrbedarf zielgerichtet miteinander, um eine Alternative zu Kurzarbeit zu bieten. Registriere Dein Unternehmen jetzt!' },
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
            file: 'de.js',
            isCatchallLocale: true // This one will be used as catchall locale
          },
        ],

        lazy: true,
        langDir: 'lang/',

        vueI18nLoader: false,
        defaultLocale: 'de',

        vueI18n: {
          fallbackLocale: 'de',
        }
      }
    ],
  ],

  env: {
    region: process.env.DEFAULT_AWS_REGION || 'eu-west-1',
    userPoolId: findAWSExport('CognitoUserPool'),
    identityPoolId: findAWSExport('CognitoIdentityPool'),
    userPoolWebClientId: findAWSExport('CognitoUserPoolClient'),
    useBetaLogo: process.env.USE_BETA_LOGO == 'true',
    endpoint: findAWSExport('ApiGatewayRestApiId'),
  },

  /*
  ** Apollo module configuration
  ** See https://github.com/nuxt-community/apollo-module
  */
  apollo: {
    // required
    defaultOptions: {
      $query: {
        fetchPolicy: 'network-only',
      }
    },

    clientConfigs: {
      default: '@/apollo/config.js',
    }
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
    config: {
      release: version,
    },
    webpackConfig: {
      release: version,
    }
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

      const markdownIt = require('markdown-it');
      const anchor = require('markdown-it-anchor');

      // add frontmatter-markdown-loader
      config.module.rules.push({
        test: /\.md$/,
        include: path.resolve(__dirname, "content"),
        loader: "frontmatter-markdown-loader",
        options: {
          mode: [Mode.VUE_COMPONENT, Mode.META],
          markdownIt: markdownIt({html: true}).use(anchor),
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
