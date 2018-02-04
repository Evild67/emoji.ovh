module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "😎 Emoji.ovh - Copy & Paste your Emojis",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      },
      {
        hid: "description",
        name: "description",
        content: "Copy & Paste your Emojis ! 😀😁😂🤣😃😄😅😆😉"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  modules: ["@nuxtjs/bulma"],

  plugins: [
    "~plugins/vue-instantsearch",
    "~plugins/vue-observe-visibility",
    "~plugins/vue-clipboard2"
  ],
  css: [
    "~/css/main.css",
    "~/css/balloon.min.css",
    "~/css/toastr.min.css",
    "~/css/bulma-checkradio.css"
  ],
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
