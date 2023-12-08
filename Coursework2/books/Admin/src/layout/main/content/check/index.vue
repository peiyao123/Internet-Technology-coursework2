<template>
    <div class="blogs">
        <div class="title">To be reviewed</div>
        <div class="list">
            <el-table :data="articleList" style="width: 100%" stripe border>
                <el-table-column prop="id" label="ID" width="100"></el-table-column>
                <el-table-column prop="title" label="Title" width="300">
                    <template slot-scope="scope">
                        <span class="title">{{ scope.row.title }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="author" label="Author" width="200"></el-table-column>
                <el-table-column prop="tag" label="Tag" width="150"></el-table-column>
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
                <el-table-column label="Handle">
                    <template slot-scope="scope">
                        <el-button type="text" @click="showDetail(scope.row)">Check</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="Check" :visible.sync="isShowDialog" width="80%" class="dialog">
            <el-descriptions  direction="vertical" :column="4" border>
                <el-descriptions-item label="Title" :span="4">{{ currentCheck.title }}</el-descriptions-item>
                <el-descriptions-item label="Author" :span="1">{{ currentCheck.author }}</el-descriptions-item>
                <el-descriptions-item label="Tag" :span="1">
                    <el-tag size="small">{{ currentCheck.tag }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="Is Original" :span="1">
                    <span v-if="currentCheck.isOriginal = 1">Original</span>
                    <span v-else>Reprint</span>
                </el-descriptions-item>
                <el-descriptions-item label="Time" :span="1">{{ currentCheck.createTime | dateFormat }}</el-descriptions-item>
                <el-descriptions-item label="Description" :span="4">{{ currentCheck.articleDesc }}</el-descriptions-item>
                <el-descriptions-item label="Body" :span="4" >
                    <div class="articleBody">
                        <Editor style=" height: auto; overflow-y: hidden;" v-model="currentCheck.body" :defaultConfig="editorConfig" :mode="mode"
                        @onCreated="onCreated" />
                    </div>
                </el-descriptions-item>    
                <el-descriptions-item label="Cover" :span="4" >
                    <img style="width: 200px;" :src="'http://127.0.0.1:3000'+currentCheck.imageUrl" alt="">
                </el-descriptions-item>
            </el-descriptions>
            <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="checkArticle(1)">No Pass</el-button>
                <el-button type="success" @click="checkArticle(2)">Pass</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { getNoCheckArticle, updateArticleStatus } from '@/api/article'
import moment from 'moment'
import { Editor } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'

export default {
    components: { Editor },
    data() {
        return {
            editor: null,
            toolbarConfig: {},
            editorConfig: { placeholder: '请输入内容...', readOnly: true},
            mode: 'default',
            articleList: [],//待审核文章列表
            currentCheck:{}, //当前审核文章
            isShowDialog: false, //是否显示对话框
        }
    },
    created() {
        this.getAll()
    },
    methods: {
        onCreated(editor){
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
        getAll() {
            getNoCheckArticle({}).then(res => {
                if (res.data.code === 200) {
                    this.articleList = res.data.articles
                } else {
                    this.$message.error(res.data.message)
                }
            })
        },
        showDetail(article) {
            this.isShowDialog = true
            this.currentCheck = article
        },
        checkArticle(value){
            this.isShowDialog = false

            updateArticleStatus({id:this.currentCheck.id,status:value}).then(res => {
                if(res.data.code === 200){
                    this.$message.success(res.data.message)
                }else{
                    this.$message.error(res.data.message)
                }
            }).then(()=>{
                this.getAll()
            })
        }
    },
    filters: {
        dateFormat(value) {
            return moment(value).format('YYYY-MM-DD')
        }
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    }
}
</script>

<style scoped lang='less'>
.blogs {
    width: 100%;
    padding: 20px;
    position: relative;

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

    .dialog{
        width: 100%;
        overflow-x: hidden;
        
    }


    .articleBody{
        width: 100%;
        overflow: auto;
    }
}

:deep(.el-descriptions__body){
    overflow: auto;
}
</style>