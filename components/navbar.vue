<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">

      <router-link class="navbar-item" to="/" rel="home">
        <img src="https://res.cloudinary.com/dhaas/image/upload/q_auto,f_auto,w_50,h_28/v1516273578/logo" alt="Logo Dominique HAAS" width="50" height="28
        ">
      </router-link>

      <div id="navbarBurger" class="navbar-burger burger" data-target="navMenuDocumentation">
        <span></span>
        <span></span>
        <span></span>
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
