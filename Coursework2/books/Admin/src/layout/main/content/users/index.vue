<template>
    <div class="users">
        <div class="title">User List</div>
        <div class="list">
            <el-table :data="userList" style="width: 100%" stripe border>
                <el-table-column prop="id" label="ID" width="100"></el-table-column>
                <el-table-column prop="username" label="Account" width="180"></el-table-column>
                <el-table-column prop="nickname" label="Nickname" width="200"></el-table-column>
                <el-table-column prop="type" label="Role" width="180">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type === 0">User</span>
                        <span v-if="scope.row.type === 1">Administrator</span>
                        <span v-if="scope.row.type === 2">Super Admin</span>
                    </template>
                </el-table-column>
                <el-table-column label="Set">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.type === 0" type="text" @click="setType(scope.row.id,1)">Set as administrator</el-button>
                        <el-button v-if="scope.row.type === 1" type="text" @click="setType(scope.row.id,0)">Set as user</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination
                    background
                    :page-size="limit"
                    layout="prev, pager, next"
                    :total="total"
                    hide-on-single-page
                    small
                    @current-change="currentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { getAllUser,updateUserType,getUserCount } from '@/api/user'
export default{
    data(){
        return{
            limit:10,
            currentPage:1,
            total:0,
            userList:[]
        }
    },
    mounted(){
        this.getAll()
    },
    methods: {
        getAll(){
            let offset = this.limit * (this.currentPage - 1)
            getAllUser({limit:this.limit,offset:offset}).then(res => {
                if(res.data.code === 200){
                    this.userList = res.data.users
                }
            })
        },
        getTotal(){
            getUserCount({}).then(res => {
                if(res.data.code === 200){
                    this.total = res.data.total
                }
            })
        },
        setType(userId,type){
            updateUserType({userId:userId,type:type}).then(res =>{
                if(res.data.code === 200){
                    this.$message.success(res.data.message)

                    this.getAll()
                }else{
                    this.$message.error(res.data.message)
                }
            })
        },
        //换页
        currentChange(value){

            this.currentPage = value

            this.getAll()
        }
    }
}
</script>

<style scoped lang='less'>
.users{
    width: 100%;
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