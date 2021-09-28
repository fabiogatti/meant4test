<template>
  <div class="switchC" :mode="state" :isDark="isDark">
    <p>{{ title }}</p>
    <div class="switch-div">
      <input type="checkbox" v-model="state">
      <div class="circle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name:"switchC",
  props:['init','title','isDark'],
  data(){
    return{
      state:this.init,
    }
  },
  watch:{
    state(){
      this.$emit('state',this.state);
    }
  }
}
</script>

<style scoped>
.switchC{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.switch-div{
  position: relative;
  width: 3em;
  height: 1.5em;
  background-color: var(--text-color-inactive);
  border-radius: 25px;
  transition: all 0.35s ease;
  opacity: 0.5;
  display: flex;
}
.switchC[mode] .switch-div{
  background-color: var(--text-color2);
}
.switchC[mode] p{
  color: var(--text-color2);
}
.switchC[mode] .circle{
  transform: translateX(1.6em);
}
.switchC[isDark] .switch-div{
  opacity: 0.9;
}
input{
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  margin: 0;
  border-radius: 25px;
  z-index: 5;
}
.circle{
  position: relative;
  border-radius: 50%;
  background-color: var(--color-white);
  height: 1em;
  width: 1em;
  align-self: center;
  margin: 3px;
  transition: all 0.35s ease;
}
p{
  transition: color 0.35s ease;
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 0.8em;
  color: var(--text-color-inactive);
}
</style>