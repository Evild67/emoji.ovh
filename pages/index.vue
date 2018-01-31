<template>
<div class="container">

  <ais-index :search-store="searchStore" :query="query" :query-parameters="{
            hitsPerPage:9999
           }">

         <ais-search-box>

              <ais-input
              placeholder="Search for emoji..."
              :class-names="{
                'ais-input': 'input'
                }"
              ></ais-input>


    </ais-search-box>


         <no-ssr>
           <div class="is-pulled-right">
<ais-powered-by></ais-powered-by>
           </div>

    </no-ssr>




    <ais-results class="emojis has-text-centered" :results-per-page="9999">

      <template slot-scope="{ result }" >

        <span>{{ result.emoji }}</span>

      </template>

    </ais-results>

    <ais-no-results class="emojis has-text-centered">
   <template slot-scope="props">
   	No products found for <i>{{ props.query }}</i>.
   </template>
</ais-no-results>

  </ais-index>
</div>
</template>

<script>
import {
  createFromAlgoliaCredentials,
  createFromSerialized
} from "vue-instantsearch";
const searchStore = createFromAlgoliaCredentials(
  "MHSLRVK5SX",
  "e09e72a63fcc5a9b1a0b9e26b33041ca"
);
searchStore.indexName = "emoji";

export default {
  async asyncData() {
    searchStore.start();
    await searchStore.waitUntilInSync();

    return { serializedSearchStore: searchStore.serialize() };
  },

  data() {
    return {
      searchStore: null
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
  }
};
</script>
<style>
.emojis {
  margin-top: 20px;
  font-family: "Segoe UI Emoji";
  font-size: 3.5em;
}

.is-vertical-center {
  display: flex;
  align-items: center;
}
</style>
