<template>



      <div class="emoji--tones columns is-centered is-mobile ">

        <div class="column emoji--container emoji--mini" v-for="(skin,index) in modifiers" :key="index" @click="setSkinTone(index)">
          <span v-if="selectedModifierIndex == index" class="emoji">{{selectedModifier + skin}}</span>
          <span v-else class="emoji">{{defaultModifier + skin}}</span>
        </div>

      </div>


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
      localStorage.setItem('selectedModifierIndex', index)
      this.$emit('update:selectedModifierIndex', index)

    }
  }

}
</script>
<style>
.emoji--tones {
  border-top: 2px solid #6772e5;
  background-color: #fefefe;
  height: 50px;
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  z-index: 30;
}
.emoji--tones .emoji--mini {
  border-radius: 0
}
</style>

