<template>
    <div class="main">
        <Header></Header>
        <div class="down">
            <Side></Side>
            <Content></Content>
        </div>
    </div>
</template>

<script>
import Header from './header'
import Side from './side'
import Content from './content'
export default{
    components:{
        Header,
        Side,
        Content
    },
    data(){
        return{

        }
    }
}
</script>

<style scoped lang='less'>
.main{
    width: 100%;
    background-color: #f3f3f3;
    .down{
        width: 100%;
        display: flex;

    }
}
</style>