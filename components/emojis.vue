<template>


  <ais-index :search-store="searchStore" >
    <ais-search-box></ais-search-box>
<ais-powered-by></ais-powered-by>
    <ais-results class="emojis">

      <template slot-scope="{ result }" >

        <span>{{ result.emoji }}</span>

      </template>

    </ais-results>

  </ais-index>

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

  created() {
    this.searchStore = createFromSerialized(this.serializedSearchStore);
  }
};
</script>
<style>
.emojis {
  font-family: "Segoe UI Emoji";
  font-size: 3.5em;
}
</style>
