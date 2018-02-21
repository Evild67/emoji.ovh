<template>
  <div>
    <hero-index></hero-index>
    <section class="section">
      <div class="container">

        <div class="columns">
          <div class="column is-3 is-hidden-touch">
            <emoji-groups :groups="groups" :selectedGroups.sync="selectedGroups"></emoji-groups>
          </div>
          <div class="column">

            <ais-index :search-store="searchStore" :query="query" :query-parameters="{
            page:page,
            facetFilters:getfacetFilters(),

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

                <section class="section">
                  <h3 class="title is-3"> Your Most Recently Copied Emojis</h3>

                  <div class="columns is-multiline is-centered is-mobile">

                    <div v-for="(emoji, index) in mostRecentlyCopiedEmojis" :key="index" class="column emoji--container" v-clipboard:copy="emoji" v-clipboard:success="onCopy" data-balloon-pos="down">

                      <span class="emoji">
                        {{ emoji }}
                      </span>

                    </div>

                  </div>

                </section>

                <section class="section">
                  <h3 class="title is-3">Emojis</h3>
                  <ais-results class="columns is-multiline is-centered is-mobile" :stack="true" :results-per-page="500">

                    <template slot-scope="{ result }">
                      <div class="column emoji--container" v-clipboard:copy="result.emoji" v-clipboard:success="onCopy" :data-balloon="firstLetterUpperCase(result.name)" data-balloon-pos="down">

                        <span class="emoji">
                          {{ result.emoji }}
                        </span>

                      </div>
                    </template>

                  </ais-results>

                  <ais-no-results class="emojis has-text-centered">
                    <template slot-scope="props">
                      <div v-if="props.query != '' ">
                        No products found for
                        <i>{{ props.query }}</i>.
                      </div>
                      <div v-else-if="totalPages === 0" class="has-text-centered ">

                        <img src="/pacman.svg " alt="Pacman " height="200px " width="200px ">

                      </div>

                    </template>
                  </ais-no-results>
                </section>
                <div v-if="page < totalPages " class="has-text-centered " v-observe-visibility="loadMore ">
                  <img src="/pacman.svg " alt="Pacman " height="200px " width="200px ">
                </div>

              </section>
            </ais-index>

          </div>
        </div>

      </div>
    </section>
  </div>

</template>

<script>
import toastr from "toastr";
import {
  createFromAlgoliaCredentials,
  createFromSerialized
} from "vue-instantsearch";
const searchStore = createFromAlgoliaCredentials(
  "MHSLRVK5SX",
  "e09e72a63fcc5a9b1a0b9e26b33041ca"
);
import heroIndex from '~/components/hero_index'
import emojiGroups from '~/components/emoji/groups'
export default {
  components: {
    heroIndex,
    emojiGroups
  },
  async asyncData ({ context, route }) {
    searchStore.indexName = "emoji";
    searchStore.query = route.params.query ? route.params.query : "";

    searchStore.start();

    await searchStore.waitUntilInSync();

    return { serializedSearchStore: searchStore.serialize() };
  },

  data () {
    return {
      mostRecentlyCopiedEmojis: [],
      totalPages: 0,
      page: 1,
      searchStore: null,
      query: "",
      selectedGroups: [],
      groups: [
        { name: "Smiley & People", value: "smileys-people" },
        { name: "Animals & Nature", value: "animals-nature" },
        { name: "Food & Drink", value: "food-drink" },
        { name: "Travel Places", value: "travel-places" },
        { name: "Activities", value: "activities" },
        { name: "Objects", value: "objects" },
        { name: "Symbols", value: "symbols" },
        { name: "Flags", value: "flags" }
      ]
    };
  },
  methods: {
    onCopy (e) {
      const foundEmoji = this.mostRecentlyCopiedEmojis.indexOf(e.text);

      if (foundEmoji !== -1) {
        this.mostRecentlyCopiedEmojis.splice(foundEmoji, 1);
      }
      if (this.mostRecentlyCopiedEmojis.length === 8) {
        this.mostRecentlyCopiedEmojis.splice(7, 1);

      }
      this.mostRecentlyCopiedEmojis.unshift(e.text);
      localStorage.setItem('mostRecentlyCopiedEmojis', JSON.stringify(this.mostRecentlyCopiedEmojis))
      toastr.options = {
        timeOut: 1000,
        positionClass: "toast-bottom-right"
      };
      toastr.success("Copied");

    },
    firstLetterUpperCase (string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },
    getfacetFilters () {
      const facetFilter = [];
      let facetFilterGroup = [];
      this.selectedGroups.forEach(group => {
        facetFilterGroup.push("group:" + group);
      });
      facetFilter.push(facetFilterGroup);
      return facetFilter;
    },
    loadMore: function (isVisible) {
      if (isVisible && this.page < this.totalPages) {
        this.page++;
      }
    }
  },
  watch: {
    selectedGroups (value) {
      searchStore.stop();
      this.page = 1;

      searchStore.start();
      searchStore.refresh();
    },
    "searchStore.totalPages" (value) {
      this.totalPages = value;
    },
    "searchStore.query" (value) {
      if (value != "") {
        this.$router.push({
          query: { q: value }
        });
      } else {
        this.$router.push({});
      }
    }
  },
  created () {
    this.searchStore = createFromSerialized(this.serializedSearchStore);
  },

  mounted () {


    this.mostRecentlyCopiedEmojis = JSON.parse(localStorage.getItem('mostRecentlyCopiedEmojis')) || []






  }
};
</script>
<style>
.emoji--container {
  font-family: "Segoe UI Emoji";
  font-size: 3.5em;
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
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
