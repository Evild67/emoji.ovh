module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "emoji.ovh",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  modules: ["@nuxtjs/bulma", "@nuxtjs/apollo"],
  apollo: {
    clientConfigs: {
      default: "~/apollo/network-interfaces/default.js"
    }
  },
  plugins: ["~plugins/vue-instantsearch"],
  css: ["~/css/main.css"],
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#3B8070" },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    postcss: {
      plugins: {
        "postcss-custom-properties": false
      }
    },
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        });
      }
    }
  }
};
