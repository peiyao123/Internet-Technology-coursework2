<template>
    <div class="about">
        <div class="info">
            <div class="title">Message Board</div>
            <div class="secondTitle">
                If you have good suggestions, please leave a message to us.
            </div>
        </div>
        <Comment :articleId="0"></Comment>
    </div>
</template>

<script>
import Comment from '@/components/Comment.vue';
export default{
    components:{
        Comment
    },
    data(){
        return{

        }
    }
}
</script>

<style scoped lang='less'>
.about{
    width: 930px;
    padding:30px;
    background-color: #fff;
    border-radius: 5px;
    min-height: calc(100vh - 120px);

    .info{
        width: 100%;

        .title{
            width: 100%;
            text-align: center;
            font-size: 20px;
        }

        .secondTitle{
            margin-top: 20px;
            width: 100%;
            text-align: center;
            font-size: 16px;
            color:#777;
        }
    }
}
</style>