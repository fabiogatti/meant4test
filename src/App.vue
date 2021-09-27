<template>
  <div id="app">
    <img class="logo" alt="meant4 logo" src="./assets/meant4logo.png" />
    <h1>Web form test</h1>
    <formC :typeMode="true"/>
  </div>
</template>

<script>
import formC from "./components/formC.vue";

export default {
  name: "App",
  components: {
    formC,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lato&family=Roboto+Slab:wght@500&display=swap');

*{
  font-family: 'Lato', sans-serif;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1{
  font-family: 'Roboto Slab', serif;
  color: #2DACE2;
}
.logo{
  height: 15vh;
}
</style>
