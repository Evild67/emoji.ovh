<template>
  <div class="body">
    <hero-index class="is-hidden-mobile"></hero-index>
    <section class="section">
      <div class="container">

        <div class="columns ">

          <div class="column">

            <div class="field is-grouped is-grouped-multiline" v-if="selectedGroups && selectedGroups.length > 0">

              <div class="control" v-for="(group,index) in selectedGroups" :key="group.name">
                <div class="tags has-addons">
                  <span class="tag is-link">{{group.name}}</span>
                  <a class="tag is-delete" @click="removeSelectedGroup(index)"></a>
                </div>
              </div>

            </div>
            <div v-else class="field is-grouped is-grouped-multiline">

              <div class="control">
                <div class="tags">
                  <span class="tag is-link">All</span>
                </div>
              </div>

            </div>

            <ais-index :search-store="searchStore" :query="query" :query-parameters="{ page:page, facetFilters:getfacetFilters()}">

              <ais-search-box>

                <ais-input placeholder="Search for emoji..." :class-names="{
                'ais-input': 'input is-large'
                }" autofocus></ais-input>

              </ais-search-box>
              <div class="columns is-mobile">
                <div class="column advanced-filter" @click="displayAdvancedFilter = !displayAdvancedFilter">
                  <span v-if="!displayAdvancedFilter">⬇️Show advanced filter</span>
                  <span v-else>⬆️ Hide advanced filter</span>
                </div>
                <div class="column">
                  <no-ssr>

                    <div class="is-pulled-right">
                      <ais-powered-by></ais-powered-by>
                    </div>

                  </no-ssr>
                </div>
              </div>

              <emoji-groups v-if="displayAdvancedFilter" class="" :groups="groups" :selectedGroups.sync="selectedGroups"></emoji-groups>

              <div>

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
                      <div v-if="selectedModifierIndex !== 0 && result.skins && result.skins[selectedModifierIndex - 1]" class="column emoji--container" v-clipboard:copy="result.skins[selectedModifierIndex - 1].emoji" v-clipboard:success="onCopy" :data-balloon="firstLetterUpperCase(result.name)" data-balloon-pos="down">

                        <span class="emoji">
                          {{ result.skins[selectedModifierIndex - 1].emoji }}
                        </span>

                      </div>
                      <div v-else class="column emoji--container" v-clipboard:copy="result.emoji" v-clipboard:success="onCopy" :data-balloon="firstLetterUpperCase(result.name)" data-balloon-pos="down">

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

              </div>
            </ais-index>

          </div>
        </div>

      </div>
    </section>
    <emoji-tones :selectedModifierIndex.sync="selectedModifierIndex"></emoji-tones>
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
import emojiTones from '~/components/emoji/tones'
export default {
  components: {
    heroIndex,
    emojiGroups,
    emojiTones
  },
  async asyncData({ context, route }) {
    searchStore.indexName = "emoji";
    searchStore.query = route.params.query ? route.params.query : "";

    searchStore.start();

    await searchStore.waitUntilInSync();

    return { serializedSearchStore: searchStore.serialize() };
  },

  data() {
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
      ],

      selectedModifierIndex: 0,
      displayAdvancedFilter: false
    };
  },
  methods: {

    removeSelectedGroup(index) {
      this.selectedGroups.splice(index, 1)
    },
    onCopy(e) {
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
    firstLetterUpperCase(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },
    getfacetFilters() {
      const facetFilter = [];
      let facetFilterGroup = [];
      this.selectedGroups.forEach(group => {
        facetFilterGroup.push("group:" + group.value);
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
    selectedGroups(value) {
      searchStore.stop();
      this.page = 1;

      searchStore.start();
      searchStore.refresh();
    },
    "searchStore.totalPages"(value) {
      this.totalPages = value;
    },
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

    this.selectedModifierIndex = localStorage.getItem('selectedModifierIndex') || 0
    this.mostRecentlyCopiedEmojis = JSON.parse(localStorage.getItem('mostRecentlyCopiedEmojis')) || []






  }
};
</script>
<style>
.body {
  margin-top: 54px;
}
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

.emoji--mini {
  font-family: "Segoe UI Emoji";
  font-size: 1.5em;
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
  padding: 0;
}

abbr.emoji {
  text-decoration: none;
}

.is-vertical-center {
  display: flex;
  align-items: center;
}
.advanced-filter {
  cursor: pointer;
}
</style>
