<template>
    <div class="layout" v-if="$route.meta.isShowHeader">
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
    </div>
    <div class="layout" v-else>
        <router-view></router-view>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default{
    components:{
        Header,
        Footer
    },
    data(){
        return{

        }
    }
}
</script>

<style scoped lang='less'>
.layout{
    display: flex;
    flex-flow: column;
    align-items: center;
    background-color: #f6f6f6;
    min-height: 100vh;
    padding-bottom: 20px;
}
</style>