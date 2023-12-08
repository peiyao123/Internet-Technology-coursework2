<template>
    <div id="app">
      <Layout></Layout>
    </div>
</template>

<script>
import Layout from './layout/index.vue'
export default{
    components:{
      Layout
    },
    data(){
        return{

        }
    }
}
</script>

<style>
html,body{
  padding:0;
  margin:0;
}

*{
  box-sizing: border-box;
}

ul{
  margin:0;
  padding: 0;
}
li{
  list-style: none;
}
</style>