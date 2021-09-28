<template>
  <div id="app">
    <img class="logo" alt="meant4 logo" src="./assets/meant4logo.png" />
    <div class="switch-controls">
      <switchC :init='this.typeMode' :title='"Validation Typing"' :isDark='darkMode' @state="switchMode"/>
      <switchC :init='this.darkMode' :title='"Dark mode"' :isDark='darkMode' @state="switchColor"/>
    </div>
    <h1>Web form test</h1>
    <formC :typeMode="this.typeMode"/>
  </div>
</template>

<script>
import formC from "./components/formC.vue";
import switchC from "./components/switchC.vue";

export default {
  name: "App",
  components: {
    formC,
    switchC
  },
  data(){
    return{
      typeMode:true,
      darkMode:false
    }
  },
  methods:{
    switchMode(mode){
      this.typeMode = mode;
    },
    switchColor(isDark){
      let r = document.querySelector('#app');
      this.darkMode = isDark;
      if(isDark){
        r.style.setProperty('--back-color', 'rgb(31, 31, 31)');
        r.style.setProperty('--text-color', 'rgb(156, 187, 218)');
        r.style.setProperty('--text-color2', 'rgb(58, 163, 207)');
        r.style.setProperty('--text-color-inactive', 'rgb(112, 112, 112)');
        r.style.setProperty('--color-white', 'rgb(19, 19, 19)');
        r.style.setProperty('--button-color', 'rgb(60, 169, 241)');
        r.style.setProperty('--input-color', 'rgb(238, 238, 238)');
        r.style.setProperty('--valid-color', 'rgba(90, 241, 90, 0.8)');
        r.style.setProperty('--invalid-color', 'rgba(146, 22, 22, 0.75)');
        r.style.setProperty('--invalid-color-error', 'rgba(231, 33, 33, 0.8)');
        r.style.setProperty('--scroll-back-color', 'rgb(187, 187, 187)');
        r.style.setProperty('--scroll-color', 'rgb(70, 70, 70)');
        return
      }
      else{
        r.style.setProperty('--back-color', 'rgb(246, 246, 246)');
        r.style.setProperty('--text-color', 'rgb(98, 142, 187)');
        r.style.setProperty('--text-color2', 'rgb(45, 172, 226)');
        r.style.setProperty('--text-color-inactive', 'rgb(179, 179, 179)');
        r.style.setProperty('--color-white', 'rgb(255,255,255)');
        r.style.setProperty('--button-color', 'rgb(138, 138, 138)');
        r.style.setProperty('--input-color', 'rgb(0, 0, 0)');
        r.style.setProperty('--valid-color', 'rgba(10, 148, 10,0.5)');
        r.style.setProperty('--invalid-color', 'rgba(230, 90, 90,0.65)');
        r.style.setProperty('--invalid-color-error', 'rgba(230, 90, 90,0.8)');
        r.style.setProperty('--scroll-back-color', 'rgb(231, 231, 231)');
        r.style.setProperty('--scroll-color', 'rgb(250,250,250)');
        return
      }
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&family=Roboto+Slab:wght@500&display=swap&family=Roboto&family=Roboto+Mono&display=swap');

*{
  font-family: 'Lato', sans-serif;
  transition: all 0.5s ease;
}
body{
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /*--back-color: rgb(31, 31, 31);*/
  --back-color: rgb(246, 246, 246);
  /*--text-color: rgb(156, 187, 218);*/
  --text-color: rgb(98, 142, 187);
  /*--text-color2: rgb(58, 163, 207);*/
  --text-color2: rgb(45, 172, 226);
  /*--text-color-inactive: rgb(112, 112, 112); */
  --text-color-inactive: rgb(179, 179, 179);
  /*--color-white: rgb(19, 19, 19);*/
  --color-white: rgb(255,255,255);
  /*--button-color: rgb(60, 169, 241);*/
  --button-color: rgb(138, 138, 138);
  /*--input-color: rgb(238, 238, 238);*/
  --input-color: rgb(0, 0, 0);
  /*--valid-color:rgba(90, 241, 90, 0.8);*/
  --valid-color:rgba(10, 148, 10,0.5);
  /*--invalid-color:rgba(146, 22, 22, 0.75);*/
  --invalid-color:rgba(230, 90, 90,0.65);
  /*--invalid-color-error:rgba(231, 33, 33, 0.8);*/
  --invalid-color-error:rgba(230, 90, 90,0.8);
  /*--scroll-back-color:rgb(187, 187, 187);*/
  --scroll-back-color:rgb(231, 231, 231);
  /*--scroll-color:rgb(70, 70, 70); */
  --scroll-color:rgb(250, 250, 250);
  background-color: var(--back-color);
  height: 100vh;
}
h1{
  transition: all 0.3s ease;
  font-family: 'Roboto Slab', serif;
  color: var(--text-color2);
}
.logo{
  transition: all 0.3s ease;
  height: 15vh;
}
.switch-controls{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 50%;
}

::-webkit-scrollbar {
  width: 15px;
  opacity: 0.5;
}

::-webkit-scrollbar-track {
  background-color: var(--scroll-back-color);
  border-radius: 100px;
  margin: 2px;
}

::-webkit-scrollbar-thumb {
  border-radius: 100px;
  border: 2px solid transparent;
  background-clip: content-box;
  background-color: var(--scroll-color);
}

@media screen and (max-width:480px) {
  .logo{
    height: initial;
    width: 90%;
  }
  h1{
    font-size: 1.35em;
  }
}
@media screen and (max-width:1536px) {
  .switch-controls{
    width: 50%;
  }
}

@media screen and (max-width:1024px) {
  .switch-controls{
    width: 75%;
  }
}
@media screen and (max-width:640px) {
  .switch-controls{
    width: 90%;
  }
}
</style>
