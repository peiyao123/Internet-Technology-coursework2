<template>
    <div class="blogs">
        <div class="title">All Books({{ total }})</div>
        <div class="list">
            <el-table :data="articleList" style="width: 100%" stripe border>
                <el-table-column prop="id" label="ID" width="100"></el-table-column>
                <el-table-column prop="title" label="Title" width="300">
                    <template slot-scope="scope">
                        <span class="title">{{ scope.row.title }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="author" label="Author" width="200"></el-table-column>
                <el-table-column prop="tag" label="Tag"></el-table-column>
                <el-table-column prop="isOriginal" label="Original" width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.isOriginal === 0">No</span>
                        <span v-else>Yes</span>
                    </template>
                </el-table-column>
                <el-table-column prop="time" label="Create Time" width="150">
                    <template slot-scope="scope">
                        <span>{{ scope.row.createTime | dateFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Status" width="300">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.status" active-text="Normal" inactive-text="Take Down" :active-value=2
                            :inactive-value=1 active-color="#13ce66" inactive-color="#ccc"
                            @change="changeStatus(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="Handle" width="100">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" icon="el-icon-edit" circle @click="showEdit(scope.row)"></el-button>
                        <el-button type="danger" size="mini" icon="el-icon-delete" circle
                            @click="deleteHandle(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background :page-size="limit" layout="prev, pager, next" :total="total" small
                    hide-on-single-page @current-change="currentChange">
                </el-pagination>
            </div>

        </div>

        <el-dialog title="Check" :visible.sync="isShowDialog" width="80%" class="dialog">
            <el-descriptions  direction="vertical" :column="4" border>
                <el-descriptions-item label="Title" :span="4">
                    <el-input v-model="currentCheck.title"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="Author" :span="1">
                    <el-input v-model="currentCheck.author"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="Tag" :span="1">
                    <el-input v-model="currentCheck.tag"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="Is Original" :span="1">
                    <el-switch v-model="currentCheck.isOriginal" active-text="Original" inactive-text="Reprint" :active-value=1
                            :inactive-value=0 active-color="#13ce66" inactive-color="#ccc">
                    </el-switch>
                </el-descriptions-item>
                <el-descriptions-item label="Time" :span="1">
                    {{ currentCheck.createTime | dateFormat }}
                </el-descriptions-item>
                <el-descriptions-item label="Description" :span="4">
                    <el-input type="textarea" v-model="currentCheck.articleDesc"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="Body" :span="4" >
                    <div class="articleBody">
                        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig"
                        :mode="mode" />
                        <Editor style=" height: auto; overflow-y: hidden;" v-model="currentCheck.body" :defaultConfig="editorConfig" :mode="mode"
                        @onCreated="onCreated" />
                    </div>
                </el-descriptions-item>    
                <el-descriptions-item label="Cover" :span="4" >
                    <img style="width: 200px;" :src="'http://127.0.0.1:3000'+currentCheck.imageUrl" alt="">
                </el-descriptions-item>
            </el-descriptions>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveHandle">Save</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getAllArticle, getArticleCount, updateArticleStatus, deleteById, edit } from '@/api/article'
import { Editor,Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import moment from 'moment'
export default {
    components: { Editor,Toolbar },
    data() {
        return {
            limit: 10,
            currentPage: 1,
            total: 0,
            editor: null,
            toolbarConfig: {},
            editorConfig: { placeholder: '请输入内容...', readOnly: false},
            mode: 'default',
            articleList: [],
            currentCheck:{}, //当前审核文章
            isShowDialog: false, //是否显示对话框
        }
    },
    mounted() {
        this.getAll()
        this.getCount()
    },
    methods: {
        onCreated(editor){
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
        getAll() {
            let offset = this.limit * (this.currentPage - 1)
            getAllArticle({ limit: this.limit, offset: offset }).then(res => {
                if (res.data.code === 200) {
                    this.articleList = res.data.articles
                } else {
                    this.$message.error(res.data.message)
                }
            })
        },
        //获取文章总数
        getCount() {
            getArticleCount({}).then(res => {
                if (res.data.code === 200) {
                    this.total = res.data.articleCount
                } else {
                    console.log(res.data.message)
                }
            })
        },
        //换页
        currentChange(value) {

            this.currentPage = value

            this.getAll()
        },
        //上下架文章
        changeStatus(article) {
            updateArticleStatus({ id: article.id, status: article.status }).then(res => {
                if (res.data.code === 200) {
                    this.$message.success(res.data.message)
                } else {
                    this.$message.error(res.data.message)
                }
            })
        },
        //删除文章
        deleteHandle(id) {
            this.$confirm('This operation will be permanently deleted. Do you want to continue?', 'Confirm', {
                confirmButtonText: 'Yes',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                deleteById({id}).then(res => {
                    if(res.data.code === 200){
                        this.$message({
                            type: 'success',
                            message: 'Success'
                        });
                        this.getAll()
                    }
                })
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Canceled'
                });
            });
        },
        showEdit(item){
            this.currentCheck = {...item}
            this.isShowDialog = true
        },
        saveHandle(){
            edit({...this.currentCheck}).then(res => {
                if(res.data.code === 200){
                    this.$message.success('Success')
                    this.isShowDialog = false;
                    this.getAll()
                }
            })
        }
    },
    filters: {
        dateFormat(value) {
            return moment(value).format('YYYY-MM-DD')
        }
    }
}
</script>

<style scoped lang='less'>
.blogs {
    width: 100%;
    padding: 20px;

    .title {
        font-size: 16px;
    }

    .list {
        margin-top: 20px;

        .title {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    .pagination {
        text-align: center;
        margin-top: 10px;
    }
}
</style>