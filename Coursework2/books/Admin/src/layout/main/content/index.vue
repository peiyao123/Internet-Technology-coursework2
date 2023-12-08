<template>
    <div class="content">
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
.content{
    margin:20px;
    height: calc(100vh - 90px);
    background-color: #fff;
    flex:1;
    overflow-x: hidden;
    overflow-y: auto;
}
</style>