<template>
  <section class="section">
    <h4 class="title is-3">Groups</h4>

    <div class="field">
      <div v-for="(group, index) in groups" :key="index">

        <input class="is-checkradio" type="checkbox" :value="group.value" v-model="initialSelectedGroups" name="group" :id="'group_'+index">
        <label :for="'group_'+index">{{group.name}}</label>

      </div>

    </div>

  </section>
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

