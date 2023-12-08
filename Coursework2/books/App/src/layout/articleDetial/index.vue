<template>
    <div class="detial">
        <div class="title">
            {{ article.title }}
            <span v-if="article.isOriginal" class="Original">Original</span>
            <span v-else class="noOriginal">Reprint</span>
        </div>
        <div class="info">
            <div class="time">
                <svg t="1674658013283" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2813" width="16" height="16"><path d="M511.913993 63.989249c-247.012263 0-447.924744 200.912481-447.924744 447.924744s200.912481 447.924744 447.924744 447.924744 447.924744-200.912481 447.924744-447.924744S758.926256 63.989249 511.913993 63.989249zM511.913993 895.677474c-211.577356 0-383.763481-172.186125-383.763481-383.763481 0-211.577356 172.014111-383.763481 383.763481-383.763481s383.763481 172.014111 383.763481 383.763481S723.491349 895.677474 511.913993 895.677474z" fill="#666666" p-id="2814"></path><path d="M672.05913 511.913993l-159.973123 0L512.086007 288.123635c0-17.717453-14.277171-32.166639-31.994625-32.166639-17.717453 0-31.994625 14.449185-31.994625 32.166639l0 255.956996c0 17.717453 14.277171 31.994625 31.994625 31.994625l191.967747 0c17.717453 0 32.166639-14.277171 32.166639-31.994625C704.053754 526.191164 689.604569 511.913993 672.05913 511.913993z" fill="#666666" p-id="2815"></path></svg>
                <span>{{ article.createTime | dataFormat }}</span>
            </div>
            <div class="author">
                <svg t="1674658189872" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3884" width="16" height="16"><path d="M642.8 531.8c64.3-42.6 106.9-115.4 106.9-198.1C749.7 202.6 643.1 96 512 96S274.3 202.6 274.3 333.7c0 82.7 42.6 155.6 106.9 198.1C215.8 582.9 96 727.7 96 898.3c0 16.4 13.3 29.7 29.7 29.7s29.7-13.3 29.7-29.7c0-180.2 159.9-326.9 356.6-326.9 196.6 0 356.6 146.6 356.6 326.9 0 16.4 13.3 29.7 29.7 29.7s29.7-13.3 29.7-29.7c0-170.6-119.8-315.4-285.2-366.5zM333.7 333.7c0-98.3 80-178.3 178.3-178.3s178.3 80 178.3 178.3S610.3 512 512 512s-178.3-80-178.3-178.3z" fill="#666666" p-id="3885"></path></svg>
                <span>{{ article.author }}</span>
            </div>
            <div class="readcount">
                <svg t="1674658424797" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5498" width="18" height="18"><path d="M512.1 208.4C264.6 208.4 64 343.7 64 510.6s200.6 302.2 448.1 302.2 448.1-135.3 448.1-302.2-200.6-302.2-448.1-302.2zM864 590.1c-17.2 27.4-42.5 52.5-75.3 74.6-34.9 23.5-75.9 42.1-121.9 55.2-48.8 13.9-100.9 21-154.7 21s-105.9-7.1-154.7-21c-46.1-13.1-87.1-31.7-121.9-55.2-32.8-22.1-58.1-47.2-75.3-74.6-16.1-25.6-24.2-52.3-24.2-79.4s8.1-53.8 24.2-79.4c17.2-27.4 42.5-52.5 75.3-74.6 34.9-23.5 75.9-42.1 121.9-55.2 48.8-13.9 100.9-21 154.7-21s105.9 7.1 154.7 21c46.1 13.1 87.1 31.7 121.9 55.2 32.8 22.1 58.1 47.2 75.3 74.6 16.1 25.6 24.2 52.3 24.2 79.4s-8.2 53.8-24.2 79.4z" p-id="5499" fill="#666666"></path><path d="M512.1 346.2c-90.9 0-164.5 73.7-164.5 164.5s73.7 164.5 164.5 164.5 164.5-73.7 164.5-164.5-73.7-164.5-164.5-164.5z m0 257c-51 0-92.5-41.5-92.5-92.5s41.5-92.5 92.5-92.5 92.5 41.5 92.5 92.5-41.5 92.5-92.5 92.5z" p-id="5500" fill="#666666"></path></svg>
                <span>{{ article.readCount }}</span>
            </div>
        </div>

        <div class="pic">
            <img :src="baseURL+article.imageUrl" alt="">
        </div>

        <div class="articleBody">
            <Editor style="height: auto; overflow-y: hidden;" v-model="article.body" :defaultConfig="editorConfig" :mode="mode"
                @onCreated="onCreated" />
        </div>

        <div class="commentArea">
            <Comment :articleId="article.id"></Comment>
        </div>
    </div>
</template>

<script>
import { Editor } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import Comment from '@/components/Comment.vue'
import { getArticleDetial,addReadCount } from '@/api/article'
import moment from 'moment'



export default{
    components: { Editor,Comment },
    data(){
        return{
            editor: null,
            toolbarConfig: {},
            editorConfig: { placeholder: 'Please enter...', readOnly: true},
            mode: 'default',
            article:{
                id:0,
                title: '',
                createTime:'',
                author: '',
                body: '',
                tag: '',
                isOriginal: 0,
                authorId:0,
                readCount:0
            },
            baseURL:'http://127.0.0.1:3000'
        }
    },
    methods:{
        onCreated(editor){
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
        getArticleData(){
            getArticleDetial({id:this.$route.query.id}).then(res => {
                if(res.data.code === 200){
                    this.article = res.data.article

                    this.addCount()
                }
            })
        },
        addCount(){
            addReadCount({id:this.article.id}).then(res => {
                
            })
        }
    },
    filters:{
        dataFormat(value){
            return moment(value).format('YYYY-MM-DD hh:mm:ss')
        }
    },
    mounted() {
        this.getArticleData()
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    }
}
</script>

<style scoped lang='less'>
.detial{
    width: 930px;
    padding:40px 30px;
    background-color: #fff;
    min-height: 100vh;

    .title{
        font-size: 28px;
        font-weight: bold;
        color:#444;

        span{
            font-size: 18px;
        }

        .Original{
            color:#ff8080;
        }

        .noOriginal{
            color:#1482ff;
        }
    }

    .info{
        margin-top: 20px;
        display: flex;
        align-items: center;
        color:#666;
        font-size: 13px;
        padding:10px 0;
        border-bottom: 1px solid #DCDFE6;

        div{
            display: flex;
            align-items: center;
            padding-right: 10px;

            span{
                padding:0 3px;
            }
        }
    }

    .pic{
        margin-top: 10px;
        padding: 20px 0;
        width: 100%;
        text-align: center;
        background-color: #f4f4f4;
        img{
            width: 20%;
        }
    }

    .articleBody{
        width: 100%;
        margin-top: 20px;
    }

    .commentArea{
        margin-top: 30px;
    }
}
</style>