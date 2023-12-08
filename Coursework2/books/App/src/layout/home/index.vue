<template>
    <div class="home">
        <div class="banner">
            <el-carousel :interval="5000" arrow="always" height="340px">
                <el-carousel-item v-for="item in bannerList" :key="item.id">
                    <img :src="item.img" alt="">
                </el-carousel-item>
            </el-carousel>
        </div>
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
import { getHotArticle } from '@/api/article'
import banner1 from '@/assets/image/banner1.jpg'
import banner2 from '@/assets/image/banner2.jpg'
import banner3 from '@/assets/image/banner4.jpg'
import ArticleCard from '@/components/ArticleCard.vue'
export default {
    components:{
        ArticleCard
    },
    data() {
        return {
            bannerList:[
                {
                    id:0,
                    img:banner1
                },
                {
                    id:1,
                    img:banner2
                },
                {
                    id:2,
                    img:banner3
                }
            ],
            articleList:[],
            limit:8,
            currentPage:0,
            isMore:true
        }
    },
    methods: {
        getAll() {
            this.currentPage = this.currentPage + 1
            let offset = this.limit * (this.currentPage - 1)
            getHotArticle({limit:this.limit,offset:offset}).then(res => {
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
        this.getAll()
    }
}
</script>

<style scoped lang='less'>
.home {
    width: 960px;
    box-sizing: border-box;
    padding: 15px;

    .banner {
        border-radius: 5px;
        overflow: hidden;
        background-color: #ccc;

        img{
            width: 100%;
            object-fit: cover;
        }
    }

    .article{
        width: 100%;
        margin-top: 30px;
        // padding:10px 0;
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