<template>
  <div class="emoji--group-list">

    <div class="field">
      <div v-for="(group, index) in groups" :key="index">

        <input class="is-checkradio" type="checkbox" :value="group.value" v-model="initialSelectedGroups" name="group" :id="'group_'+index">
        <label :for="'group_'+index">{{group.name}}</label>

      </div>

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
      get () {
        return this.selectedGroups
      },
      set (value) {
        console.log(value)
        this.$emit('update:selectedGroups', value)
      }
    }
  }

}
</script>

