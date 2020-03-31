const fs = require('fs');

if (!fs.existsSync('aws.json')) {
  console.error(`please run: npm run config:aws`);
  throw `No config file`;
}

// reads the dependencies from the cloudformation stack
const awsConfig = JSON.parse(fs.readFileSync('aws.json'));
function findAWSExport(setting) {
  const node = awsConfig.find((n) => n.ExportName === `${setting}-${process.env.STAGE || 'dev'}`);
  if (!node) throw `Setting ${setting} is not known`;

  console.log(setting, ':', node.OutputValue)
  return node.OutputValue;
}

export default {
  mode: 'universal',
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
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,700;1,500&display=swap' },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#292FBE' },
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
    {
      src: '@/plugins/amplify.js',
      mode: 'client'
    }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/gtm',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt
    'cookie-universal-nuxt',
    // Doc: https://github.com/nuxt-community/apollo-module
    '@nuxtjs/apollo'
  ],

  env: {
    region: 'eu-west-1',
    userPoolId: findAWSExport('CognitoUserPool'),
    identityPoolId: findAWSExport('CognitoIdentityPool'),
    userPoolWebClientId: findAWSExport('CognitoUserPoolClient'),
  },

  /*
  ** Apollo module configuration
  ** See https://github.com/nuxt-community/apollo-module
  */
  apollo: {
    tokenName: 'apollo-token', // optional, default: apollo-token
    cookieAttributes: {
      /*
      ** Define when the cookie will be removed. Value can be a Number
      ** which will be interpreted as days from time of creation or a
      ** Date instance. If omitted, the cookie becomes a session cookie.
      */
      expires: 7, // optional, default: 7 (days)

      /**
        * Define the path where the cookie is available. Defaults to '/'
        */
      // path: '/', // optional
      /**
        * Define the domain where the cookie is available. Defaults to
        * the domain of the page where the cookie was created.
        */
      // domain: 'example.com', // optional

      /**
        * A Boolean indicating if the cookie transmission requires a
        * secure protocol (https). Defaults to false.
        */
      secure: false,
    },
    includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
    authenticationType: '', // required to be empty
    // (Optional) Default 'apollo' definition
    defaultOptions: {
      // See 'apollo' definition
      // For example: default query options
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network',
      },
    },
    // optional
    watchLoading: '~/plugins/apollo-watch-loading-handler.js',
    // optional
    errorHandler: '~/plugins/apollo-error-handler.js',
    // required
    clientConfigs: {
      default: {
        // required
        httpEndpoint: `https://${findAWSExport('ApiGatewayRestApiId')}.execute-api.eu-west-1.amazonaws.com/dev/graphql`,

        // optional
        // override HTTP endpoint in browser only
        // browserHttpEndpoint: '/graphql',

        // optional
        // See https://www.apollographql.com/docs/link/links/http.html#options
        httpLinkOptions: {
          credentials: 'same-origin'
        },

        // You can use `wss` for secure connection (recommended in production)
        // Use `null` to disable subscriptions
        // wsEndpoint: 'ws://localhost:4000', // optional

        // LocalStorage token
        tokenName: 'apollo-token', // optional

        // Enable Automatic Query persisting with Apollo Engine
        persisting: false, // Optional

        // Use websockets for everything (no HTTP)
        // You need to pass a `wsEndpoint` for this to work
        // websocketsOnly: false // Optional
      },
    },
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Google tag manager configuration
  */
  gtm: {
    dev: true,

    id: null,
    layer: 'dataLayer',
    variables: {},

    pageTracking: false,
    pageViewEventName: 'nuxtRoute',

    autoInit: true,
    respectDoNotTrack: true,

    scriptId: 'gtm-script',
    scriptDefer: false,
    scriptURL: 'https://www.googletagmanager.com/gtm.js',

    noscript: true,
    noscriptId: 'gtm-noscript',
    noscriptURL: 'https://www.googletagmanager.com/ns.html'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
  }
}
