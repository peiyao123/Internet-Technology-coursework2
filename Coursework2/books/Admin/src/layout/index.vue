<template>
    <div class="layout">
        <router-view></router-view>
    </div>
</template>

<script>

export default{
    data(){
        return{

        }
    }
}
</script>

<style scoped lang='less'>
.layout{
    width: 100%;
    height: 100vh;
    overflow: hidden;
}
</style>