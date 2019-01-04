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
      <div class="navbar-end">
        <a class="navbar-item is-hidden-desktop-only" href="https://twitter.com/evild67" target="noopenner">

          <svg class="twitter-icon" viewBox="328 355 335 276" xmlns="http://www.w3.org/2000/svg">
            <path d="
    M 630, 425
    A 195, 195 0 0 1 331, 600
    A 142, 142 0 0 0 428, 570
    A  70,  70 0 0 1 370, 523
    A  70,  70 0 0 0 401, 521
    A  70,  70 0 0 1 344, 455
    A  70,  70 0 0 0 372, 460
    A  70,  70 0 0 1 354, 370
    A 195, 195 0 0 0 495, 442
    A  67,  67 0 0 1 611, 380
    A 117, 117 0 0 0 654, 363
    A  65,  65 0 0 1 623, 401
    A 117, 117 0 0 0 662, 390
    A  65,  65 0 0 1 630, 425
    Z" style="fill:#3BA9EE;" />
          </svg>

        </a>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  computed: {
    randomEmoji () {
      const emojis = ["😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉"];

      return emojis[Math.floor(Math.random() * emojis.length)];
    }
  },
  mounted () {
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

.twitter-icon {
  display: block;
  height: 24px;
}
</style>
