<template>
  <section class="section">
    <h4 class="title is-3">Tones</h4>

    <div class="columns is-centered is-mobile ">

      <div class="column emoji--container emoji--mini" v-for="(skin,index) in modifiers" :key="index" @click="setSkinTone(index)">
        <span v-if="selectedModifierIndex == index" class="emoji">{{selectedModifier + skin}}</span>
        <span v-else class="emoji">{{defaultModifier + skin}}</span>
      </div>

    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      defaultModifier: "✋",
      selectedModifier: "👌",
      modifiers: ["", "🏻", "🏼", "🏽", "🏾", "🏿"],
    }
  },
  props: [

    'selectedModifierIndex'
  ],

  methods: {
    setSkinTone(index) {
      this.$emit('update:selectedModifierIndex', index)

    }
  }

}
</script>
<style>
</style>

