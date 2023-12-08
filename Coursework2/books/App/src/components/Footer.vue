<template>
    <div class="footer">
        <div>Copyright © 2023 Read A Book</div>
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
.footer{
    width: 100%;
    margin-top: 20px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    div{
        color:#666;
        
    }
    .admin{
        margin-left: 20px;
        cursor: pointer;
        transition: 0.3s;
    }

    .admin:hover{
        color:#222;
    }
}
</style>