<template>
  <div id="app">
    <img
      src="./assets/images/background-img.jpg"
      style="width: 100%; height: 100%; position: absolute; z-index: -1; filter: blur(2px)"
    />
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right:0;
}
</style>
