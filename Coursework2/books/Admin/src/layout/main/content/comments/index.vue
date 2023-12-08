<template>
    <div class="comments">
        <div class="title">All Comments({{ total }})</div>
        <div class="list">
            <el-table :data="commentList" style="width: 100%" stripe border>
                <el-table-column prop="id" label="ID" width="100"></el-table-column>
                <el-table-column prop="content" label="Content" ></el-table-column>
                <el-table-column prop="nickname" label="Nickname" width="100"></el-table-column>
                <el-table-column prop="articleId" label="Artricle ID" width="100"></el-table-column>
                <!-- <el-table-column prop="userId" label="用户ID" width="100"></el-table-column> -->
                <el-table-column prop="createTime" label="Time" width="200">
                    <template slot-scope="scope">
                        <span>{{ scope.row.createTime | dateFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Handle" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" @click="deleteHandler(scope.row.id)">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="pagination">
                <el-pagination
                    background
                    :page-size="limit"
                    layout="prev, pager, next"
                    :total="total"
                    small
                    hide-on-single-page
                    @current-change="currentChange">
                </el-pagination>
            </div>
            
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { getAllComment,deleteComment,getCommentTotal } from '@/api/article'
export default{
    data(){
        return{
            limit:10,
            total:0,
            currentPage:1,
            commentList:[]
        }
    },
    mounted() {
        this.getCount()
        this.getAll()
    },
    methods: {
        getAll(){
            let offset = this.limit * (this.currentPage - 1)
            getAllComment({limit:this.limit,offset:offset}).then(res => {
                if(res.data.code === 200){
                    this.commentList = res.data.comments
                }else{
                    this.$message.error(res.data.message)
                }
            })
        },
        getCount(){
            getCommentTotal({}).then(res => {
                if(res.data.code === 200){
                    this.total = res.data.total
                }
            })
        },
        currentChange(value){
            this.currentPage = value
            this.getAll()
        },
        deleteHandler(id){
            deleteComment({id:id}).then(res => {
                if(res.data.code === 200){
                    this.$message.success(res.data.message)
                    this.getAll()
                    this.getCount()
                }else{
                    this.$message.error(res.data.message)
                }
            })
        }
    },
    filters:{
        dateFormat(value){
            return moment(value).format('YYYY-MM-DD hh:mm:ss')
        }
    }
}
</script>

<style scoped lang='less'>
.comments{
    padding:20px;

    .title {
        font-size: 16px; 
    }  

    .list{
        margin-top: 20px;

        .title{
            white-space:nowrap;  
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    .pagination{
        text-align: center;
        margin-top: 10px;
    }
}
</style>