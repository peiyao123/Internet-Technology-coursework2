<template>
    <div class="blogs">
        <ul class="article">
            <li v-for="item in articleList" :key="item.id" >
                <ArticleCard :articleinfo="item"></ArticleCard>
            </li>
            <div @click="getAll" v-if="isMore" class="more">
                Load more...
            </div>
            <div class="more" v-else>
                Nothing more
            </div>
        </ul>
    </div>
</template>

<script>
import { searchArticle, getAllArticle } from '@/api/article'
import ArticleCard from '@/components/ArticleCard.vue'
export default{
    components:{
        ArticleCard
    },
    data(){
        return{
            articleList:[],
            limit:8,
            currentPage:0,
            isMore:true,
        }
    },
    methods: {
        getAll() {
            this.currentPage = this.currentPage + 1
            let offset = this.limit * (this.currentPage - 1)
            getAllArticle({limit:this.limit,offset:offset}).then(res => {
                if(res.data.code === 200){
                    if(res.data.articles.length === 0){
                        this.$message.info('Nothing more')
                        this.currentPage = this.currentPage - 1
                        this.isMore = false
                    }else{
                        this.articleList = [...this.articleList,...res.data.articles]
                    }
                }else{
                    console.log(res.data.message);
                }
            })
        },
        searchAll() {
            this.currentPage = this.currentPage + 1
            let offset = this.limit * (this.currentPage - 1)
            searchArticle({keyword:this.$route.query.keyword,limit:this.limit,offset:offset}).then(res => {
                if(res.data.code === 200){
                    if(res.data.articles.length === 0){
                        this.$message.info('Nothing more')
                        this.currentPage = this.currentPage - 1
                        this.isMore = false
                    }else{
                        this.articleList = [...this.articleList,...res.data.articles]
                    }
                }else{
                    console.log(res.data.message);
                }
            })
        },
    },
    created() {
        if(this.$route.query.keyword){
            this.searchAll()
        }else{
            this.getAll()
        }
    },
    watch:{
        '$route.query.keyword':function(newVal){
            this.currentPage = 0
            if(newVal === ''){
                this.searchAll()
            }else{
                this.getAll()
            } 
        }
    }
}
</script>

<style scoped lang='less'>
.blogs{
    width: 960px;
    padding: 15px;
    .article{
        width: 100%;
    }

    .more{
        width: 100%;
        margin:10px auto;
        text-align: center;
        background-color: #fff;
        padding:10px 0;
        cursor: pointer;
        color:#555;
        font-size: 14px;
    }
}
</style>