<template>

  <div class="columns is-multiline">
    <div class="column is-2" v-for="(group, index) in groups" :key="index">

      <input class="is-checkradio" type="checkbox" :value="group" v-model="initialSelectedGroups" name="group" :id="'group_'+index">
      <label :for="'group_'+index">{{group.name}}</label>

    </div>

  </div>

</template>

<script>
export default {

  props: [
    'groups',
    'selectedGroups'
  ],

  computed: {
    initialSelectedGroups: {
      get() {
        return this.selectedGroups
      },
      set(value) {
        this.$emit('update:selectedGroups', value)
      }
    }
  }

}
</script>

