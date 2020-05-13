const fs = require('fs');
const path = require('path');
const glob = require('glob');
const Mode = require('frontmatter-markdown-loader/mode');
const version = require('./package.json').version;

if (!fs.existsSync('aws.json')) {
  console.error(`please run: npm run config:aws`);
  throw `No config file`;
}

if (!fs.existsSync('aws_url.json')) {
  console.error(`please run: npm run config:url`);
  throw `No config file`;
}

const urlConfig = JSON.parse(fs.readFileSync('aws_url.json'));
const rootUrl = urlConfig.split(',')[0];
const envName = process.env.NUXT_ENV_STAGE || 'dev';

// reads the dependencies from the cloudformation stack
const awsConfig = JSON.parse(fs.readFileSync('aws.json'));
function findAWSExport(setting) {
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

  router: {
    middleware: ["ie", "loaduser"],
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
    '@/plugins/mq.ts',
    { src: '~/plugins/polyfills', mode: 'client' } // thanks to https://stackoverflow.com/a/57538219
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
    'nuxt-user-agent',
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
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  env: {
    region: process.env.DEFAULT_AWS_REGION || 'eu-west-1',
    userPoolId: findAWSExport('CognitoUserPool'),
    identityPoolId: findAWSExport('CognitoIdentityPool'),
    userPoolWebClientId: findAWSExport('CognitoUserPoolClient'),
    useBetaLogo: process.env.USE_BETA_LOGO == 'true',
    endpoint: findAWSExport('ApiGatewayRestApiId'),
    rootUrl: `https://${rootUrl}`,
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
      const externalLinks = require('markdown-it-external-links');

      // add frontmatter-markdown-loader
      config.module.rules.push({
        test: /\.md$/,
        include: path.resolve(__dirname, "content"),
        loader: "frontmatter-markdown-loader",
        options: {
          mode: [Mode.VUE_COMPONENT, Mode.META],
          markdownIt: markdownIt({ html: true })
            .use(anchor)
            .use(externalLinks, { externalTarget: '_blank' }),
        }
      });
    },

    // transpile: [/^vue2-google-maps($|\/)/],
    optimizeCSS: {
    },

    transpile: [
      'vue-clamp',
      'resize-detector',
      'vuelidate-property-decorators',
    ],
  },

  generate: {
    routes: async () => {
      const info = await getDynamicPaths({
        '/info': '*.md'
      });

      const register = [
        '/welcome/demand',
        '/register/demand',
        '/register/demand/company',
        '/register/demand/team',
        '/register/demand/validate',
        '/welcome/supply',
        '/register/supply',
        '/register/supply/company',
        '/register/supply/team',
        '/register/supply/validate',
      ];

      return [...info, ...register];
    },
  },

  robots: [
    // remove robots from non-production domains
    envName != 'prod'
      ? {
        'User-agent': '*',
        'Disallow': '/',
      }
      : {
        'Sitemap': `https://${rootUrl}/sitemap.xml`,
        'User-agent': '*',
        'Disallow': '',
      }
  ],

  sitemap: {
    hostname: `https://${rootUrl}`,

    filter({ routes }) {
      return routes.filter(
        route => {
          const url = route.url || route.path;

          return true
            && !url.startsWith('/dashboard')
            && !url.startsWith('/welcome')
            && !url.startsWith('/register/supply/')
            && !url.startsWith('/register/demand/')
            ;
        }
      );
    }
  },
}
