<template>
    <div class="comment">
        <el-divider></el-divider>
        <div class="commentBox">
            <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 10 }" placeholder="Please use polite language" v-model="content"></el-input>
            <div class="btn">
                <el-button type="primary" @click="submit" size="small">Sumbit</el-button>
            </div>
        </div>
        <div class="titleAll">
            <span v-if="commentList.length == 0">No message</span>
            <span v-else>All message</span> 
        </div>
        <ul class="comments">
            <li v-for="item in commentList">
                <div class="info">
                    <div class="nickname">
                        <i class="el-icon-user"></i>
                        {{ item.nickname }}
                    </div>
                    <div class="time">{{ item.createTime | dateFormat }}</div>
                </div>
                <div class="content">
                    {{ item.content }}
                    <el-button v-if="User.userinfo.id === item.userId" type="text" @click="deleteHandler(item.id)">Delete</el-button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import moment from 'moment'
import { getComment,insertComment, deleteComment } from '@/api/article'
import { useUser } from '@/stores/userStore'
export default {
    props:['articleId'],
    data() {
        return {
            content:'',
            commentList:[],
            User: useUser()
        }
    },
    mounted() {
        this.getAllComment()
    },
    methods: {
        //获取留言
        getAllComment(){
            getComment({articleId:this.articleId}).then(res => {
                if(res.data.code === 200){
                    this.commentList = res.data.comments
                }
            })
        },
        submit(){
            if(this.content === ''){
                this.$message.error('The content cannot be empty')
                return
            }
            if(!this.User.isLogin){
                this.$message.error('Please Login')
            }else{    
                insertComment({
                    userId:this.User.userinfo.id,
                    content:this.content,
                    articleId:this.articleId,
                    nickname:this.User.userinfo.nickname
                }).then(res => {
                    if(res.data.code === 200){
                        this.$message.success(res.data.message)
                        this.content = ''
                        this.getAllComment()
                    }else{
                        this.$message.error(res.data.message)
                    }
                })
            }
        },
        deleteHandler(id){
            deleteComment({id:id}).then(res => {
                if(res.data.code === 200){
                    this.$message.success(res.data.message)
                    this.getAllComment()
                }else{
                    this.$message.error(res.data.message)
                }
            })
        }
    },
    filters:{
        dateFormat(value){
            return moment(value).fromNow()
        }
    },
    watch:{
        articleId:{
            handler(newVal,oldVal){
                this.getAllComment()
            }
        }
    }
}
</script>

<style scoped lang='less'>
.comment{
    width: 100%;

    .commentBox{
        .btn{
            margin-top: 10px;
            text-align: end;
        }
    }

    .titleAll{
        font-weight: bold;
        color:#666;
        margin-top: 20px;
    }

    .comments{
        width: 100%;
        li{
            width: 100%;
            padding:20px 0;
            border-bottom: 1px solid #e6e6e6;
            .info{
                padding:10px 0;
                width: 100%;
                display: flex;
                justify-content: space-between;
                
                .nickname{
                    color:#555;
                    cursor: pointer;
                }
                .time{
                    color:#666;
                    font-size: 14px;
                }
            }

            .content{
                padding:10px;
                margin-top: 10px;
                line-height: 24px;
                background-color: #f6f6f6;

            }
        }
    }
}
</style>