<template>
  <div>
    <dh-navbar></dh-navbar>
    <nuxt/>
    <dh-footer></dh-footer>
  </div>
</template>

<script>
import dhNavbar from "~/components/navbar.vue";
import dhFooter from "~/components/footer.vue";

export default {
  components: {
    dhNavbar,
    dhFooter
  }
};
</script>
<style>

</style>
