<template>
  <div class="container">

    <ais-index :search-store="searchStore" :query="query" :query-parameters="{
            hitsPerPage:9999
           }">

      <ais-search-box>

        <ais-input placeholder="Search for emoji..." :class-names="{
                'ais-input': 'input'
                }" autofocus></ais-input>

      </ais-search-box>

      <no-ssr>
        <div class="is-pulled-right">
          <ais-powered-by></ais-powered-by>
        </div>

      </no-ssr>

      <section class="section">
        <ais-results class="columns is-multiline is-centered" :results-per-page="9999">

          <template slot-scope="{ result }">
            <div class="column">
              <div class="emoji--container">
                <span class="emoji" :title="result.name" :data-clipboard-text="result.emoji">
                  {{ result.emoji }}
                </span>
              </div>

            </div>
          </template>

        </ais-results>

        <ais-no-results class="emojis has-text-centered">
          <template slot-scope="props">
            <div v-show="props.query != ''">
              No products found for
              <i>{{ props.query }}</i>.
            </div>

          </template>
        </ais-no-results>
      </section>
    </ais-index>
  </div>
</template>

<script>
import Clipboard from "clipboard"
import {
  createFromAlgoliaCredentials,
  createFromSerialized,
  FACET_OR
} from "vue-instantsearch";
const searchStore = createFromAlgoliaCredentials(
  "MHSLRVK5SX",
  "e09e72a63fcc5a9b1a0b9e26b33041ca"
);

export default {
  async asyncData({ context, route }) {
    searchStore.indexName = "emoji";
    searchStore.query = route.params.query ? route.params.query : '';
    searchStore.addFacet('group', FACET_OR);
    searchStore.start();
    await searchStore.waitUntilInSync();

    return { serializedSearchStore: searchStore.serialize() };
  },

  data() {
    return {
      searchStore: null,
      query: ""
    };
  },
  watch: {
    "searchStore.query"(value) {
      if (value != "") {
        this.$router.push({
          query: { q: value }
        });
      } else {
        this.$router.push({});
      }
    }
  },
  created() {
    this.searchStore = createFromSerialized(this.serializedSearchStore);

  },

  mounted() {
    new Clipboard('.emoji');
  }
};
</script>
<style>
.emoji--container {
  font-family: "Segoe UI Emoji";
  font-size: 3.5em;
  cursor: pointer;
  text-align: center;
  border-radius: 5%;
}

.emoji--container:hover {
  background: #cecece;
}

.emoji--container:active {
  background: #aeaeae;
}

abbr.emoji {
  text-decoration: none;
}

.is-vertical-center {
  display: flex;
  align-items: center;
}
</style>
