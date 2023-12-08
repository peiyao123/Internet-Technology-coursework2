<template>
    <div class="write">
        <div class="title">
            <el-input type="text" placeholder="title" v-model="article.title" maxlength="100" show-word-limit></el-input>
        </div>
        <div class="author">
            <el-input type="text" placeholder="author" v-model="article.author" maxlength="100"
                show-word-limit></el-input>
            <el-input type="text" placeholder="tag" v-model="article.tag" maxlength="20" show-word-limit></el-input>
        </div>
        <div style="border: 1px solid #ccc;">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig"
                :mode="mode" />
            <Editor style="height: 700px; overflow-y: hidden;" v-model="article.body" :defaultConfig="editorConfig"
                :mode="mode" @onCreated="onCreated" />
        </div>
        <div class="optionArea">
            <el-input type="textarea" placeholder="description" v-model="article.articleDesc" maxlength="300" show-word-limit>
            </el-input>
            <el-switch class="isOriginal" v-model="article.isOriginal" active-text="original" inactive-text="reprint" active-color="#13ce66" inactive-color="#ccc">
            </el-switch>
        </div>

        <!-- 上传图片 -->
        <div class="cover-pic">
            <el-upload
                class="avatar-uploader"
                :action="baseURL+'/article/uploadPic'"
                :headers="headers"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                    <img v-if="article.imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span>Please upload the book cover.</span>
        </div>

        <el-divider></el-divider>
        <div class="footer">
            <div class="center">
                <el-button type="primary" size="small" @click="publishHandler">Publish</el-button>
                <el-button size="small" @click="publishHandler">Save</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
// import { DomEditor } from '@wangeditor/editor'
import { publishArticle } from '@/api/article'
import { useUser } from '@/stores/userStore'

export default {
    components: { Editor, Toolbar },
    data() {
        return {
            editor: null,
            toolbarConfig: {},
            editorConfig: { placeholder: 'Please enter the content...' },
            mode: 'default',
            User: useUser(),
            article: {
                title: '',
                author: '',
                body: '',
                articleDesc:'',
                tag: '',
                isOriginal: true,
                authorId:0,
                imageUrl: ''
            },
            imageUrl:'',
            headers:{
                Authorization: window.localStorage.getItem("token")
            },
            baseURL:'http://127.0.0.1:3000'
        }
    },
    methods: {
        onCreated(editor) {

            //查看编辑器配置
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
            // setTimeout(()=>{
            //     console.log(DomEditor.getToolbar(this.editor))
            //     console.log(DomEditor.getToolbar(editor).getConfig().toolbarKeys);
            //     console.log(editor.getAllMenuKeys())
            // },1000)

            //排除 图片、视频工具栏
            this.toolbarConfig.excludeKeys = [
                "group-image",
                "group-video"
            ]
        },
        //清除表单内容
        clearForm(){
            this.article = {
                title: '',
                author: '',
                body: '',
                tag: '',
                articleDesc:'',
                isOriginal: true,
                authorId:0
            }
        },
        //发布处理函数
        publishHandler(){
            this.article.authorId = this.User.userinfo.id
            publishArticle({article:this.article}).then(res => {
                if(res.data.code === 200){
                    this.$message.success(res.data.message)
                    this.clearForm()
                    this.$router.push({path:'/'})
                }else{
                    this.$message.error(res.data.message)
                }
            })
        },
        handleAvatarSuccess(res, file) {
            this.$message.success("Success")
            //传入数据库中的URL
            this.article.imageUrl = res.url
            //回显图片
            this.imageUrl = this.baseURL + res.url
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 5;

            if (!isLt2M) {
            this.$message.error('Upload picture size cannot exceed 5MB!');
            }
            return isLt2M;
        }
    },
    mounted() {
        
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    }
}
</script>

<style scoped lang='less'>
.write {
    width: 960px;
    padding: 15px;

    .title {
        width: 100%;
        padding-bottom: 20px;

        input {
            border: 1px solid #ccc;
            width: 100%;
            height: 40px;
            font-size: 16px;
            padding: 5px 10px;
            color: #444;
        }

        input::placeholder {
            color: #999;
        }
    }

    .author {
        width: 100%;
        padding-bottom: 20px;
        display: flex;
        justify-content: space-between;

        input {
            border: 1px solid #ccc;
            width: 48%;
            height: 40px;
            font-size: 14px;
            padding: 5px 10px;
            color: #444;
        }

        input::placeholder {
            color: #ccc;
        }
    }

    .footer {
        width: 100%;

        .center {
            width: 930px;
            height: 100%;
            margin: auto;
            display: flex;
            justify-content: end;
            align-items: center;
        }
    }

    .optionArea {
        margin: 30px 0;
        width: 100%;

        .isOriginal{
            display: flex;
            justify-content: end;
            margin-top: 20px;
        }
    }

    .cover-pic{
        display: flex;
        color:#888;
        align-items: end;

        &>span{
            margin-left: 10px;
            margin-bottom: 10px;
        }
    }
}

.avatar-uploader{
    width: 178px;
    height: 178px;
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
}
.avatar-uploader .el-upload {
    
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>