<template>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <div class="emoji--group-list">
          <div class="control">
            <div v-for="(name, index) in group" :key="index">
              <label class="radio">
                <input type="radio" name="group" @click="selectedGroup = name"> {{name}}
              </label>
            </div>

          </div>
        </div>
      </div>
      <div class="column">

        <ais-index :search-store="searchStore" :query="query" :query-parameters="{
            hitsPerPage:1000,
            facetFilters:['group:' + selectedGroup ]
           }">

          <ais-search-box>

            <ais-input placeholder="Search for emoji..." :class-names="{
                'ais-input': 'input is-large'
                }" autofocus></ais-input>

          </ais-search-box>

          <no-ssr>
            <div class="is-pulled-right">
              <ais-powered-by></ais-powered-by>
            </div>

          </no-ssr>

          <section class="section">
            <ais-results class="columns is-multiline is-centered is-mobile" :results-per-page="9999">

              <template slot-scope="{ result }">
                <div class="column is-narrowed">
                  <div class="emoji--container">
                    <span class="emoji" :data-clipboard-text="result.emoji" :data-balloon="firstLetterUpperCase(result.name)" data-balloon-pos="down">
                      {{ result.emoji }}
                    </span>
                  </div>

                </div>
              </template>

            </ais-results>

            <ais-no-results class="emojis has-text-centered">
              <template slot-scope="props">
                <div v-if="props.query != '' ">
                  No products found for
                  <i>{{ props.query }}</i>.
                </div>
                <div v-else class="has-text-centered">

                  <img src="~assets/pacman.svg" alt="Pacman" height="200px" width="200px">

                </div>
              </template>
            </ais-no-results>
          </section>
        </ais-index>

      </div>
    </div>

  </div>
</template>

<script>
import Clipboard from "clipboard"
import toastr from "toastr"
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
    searchStore.start();
    await searchStore.waitUntilInSync();

    return { serializedSearchStore: searchStore.serialize() };
  },

  data() {
    return {
      searchStore: null,
      query: "",
      selectedGroup: null,
      group: ["smileys-people",
        "animals-nature",
        "food-drink",
        "travel-places",
        "activities",
        "objects",
        "symbols",
        "flags"]
    };
  },
  methods: {
    firstLetterUpperCase(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
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
    const clipboard = new Clipboard('.emoji');
    clipboard.on('success', function (e) {
      toastr.options = {
        timeOut: 1000,
        positionClass: "toast-bottom-right"
      }
      toastr.success('Copied')

      e.clearSelection();
    });



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
