<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">

      <router-link class="navbar-item" to="/" rel="home">
      {{randomEmoji}}
      </router-link>

      <div id="navbarBurger" class="navbar-burger burger is-unselectable" data-target="navMenuDocumentation">
        🍔

      </div>
    </div>
    <div id="navMenuDocumentation" class="navbar-menu">
      <div class="navbar-start">

        <router-link to="/about" class="navbar-item">
          <h2>
            About
          </h2>
        </router-link>

      </div>

    </div>
  </nav>
</template>
<script>
export default {
  computed: {
    randomEmoji() {
      const emojis = ["😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉"];

      return emojis[Math.floor(Math.random() * emojis.length)];
    }
  },
  mounted() {
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".navbar-burger"),
      0
    );

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach($el => {
        $el.addEventListener("click", () => {
          // Get the target from the "data-target" attribute
          const target = $el.dataset.target;
          const $target = document.getElementById(target);

          // Toggle the class on both the "navbar-burger" and the "navbar-menu"
          $el.classList.toggle("is-active");
          $target.classList.toggle("is-active");
          $el.textContent = $el.classList.contains("is-active") ? "🥪" : "🍔";
        });
      });
    }
  }
};
</script>
<style>
@media screen and (min-width: 1024px) {
  nav .navbar-burger {
    display: none;
  }
}
.navbar-burger {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
}
</style>
