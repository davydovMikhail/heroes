<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Главная</router-link> |
      <router-link to="/favorit">Любимые герои</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
@import url("~@/assets/styles/style.css");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #E8F2ED;
  min-height: 100%;
  padding-bottom: 1px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
