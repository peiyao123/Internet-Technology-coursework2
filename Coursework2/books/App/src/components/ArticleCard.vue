<template>
    <div class="articleCard" @click="toDetial">
        <div class="pic">
            <img :src="baseURL+articleinfo.imageUrl" alt="封面">
        </div>
        <div class="content">
            <div class="title">
                <span v-if="articleinfo.isOriginal" class="Original">Original</span>
                <span v-else class="noOriginal">Reprint</span>
                {{ articleinfo.title }}
            </div>
            <div class="desc">{{ articleinfo.articleDesc }}</div>
            <div class="info">
                <div class="readcount">
                    <svg t="1675067333556" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2737" width="18" height="18">
                        <path
                            d="M512 298.666667c-162.133333 0-285.866667 68.266667-375.466667 213.333333 89.6 145.066667 213.333333 213.333333 375.466667 213.333333s285.866667-68.266667 375.466667-213.333333c-89.6-145.066667-213.333333-213.333333-375.466667-213.333333z m0 469.333333c-183.466667 0-328.533333-85.333333-426.666667-256 98.133333-170.666667 243.2-256 426.666667-256s328.533333 85.333333 426.666667 256c-98.133333 170.666667-243.2 256-426.666667 256z m0-170.666667c46.933333 0 85.333333-38.4 85.333333-85.333333s-38.4-85.333333-85.333333-85.333333-85.333333 38.4-85.333333 85.333333 38.4 85.333333 85.333333 85.333333z m0 42.666667c-72.533333 0-128-55.466667-128-128s55.466667-128 128-128 128 55.466667 128 128-55.466667 128-128 128z"
                            fill="#888888" p-id="2738"></path>
                    </svg>
                    <span>{{ articleinfo.readCount }}</span>
                </div>
                <div class="author">
                    <svg t="1675072230394" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2702" width="12" height="12">
                        <path
                            d="M506.075809 546.976206c-145.260076 0-263.436846-118.16774-263.436846-263.418785 0-145.260076 118.17677-263.436846 263.436846-263.436846 145.260076 0 263.436846 118.16774 263.436846 263.436846C769.512655 428.799436 651.335885 546.976206 506.075809 546.976206zM506.075809 76.996419c-113.896181 0-206.561002 92.664821-206.561002 206.561002S392.179628 490.100362 506.075809 490.100362c113.905212 0 206.561002-92.646759 206.561002-206.54294S619.981021 76.996419 506.075809 76.996419z"
                            p-id="2703" fill="#888888"></path>
                        <path
                            d="M514.754388 621.191146c-250.902125 0-455.024817 174.88103-455.024817 389.840656l28.437922 0c0-199.607302 190.991939-361.411765 426.586895-361.411765s426.586895 161.804462 426.586895 361.411765l20.156698 0 8.281224 0C969.788235 796.072176 765.647482 621.191146 514.754388 621.191146z"
                            p-id="2704" fill="#888888"></path>
                        <path
                            d="M514.754388 678.057959c219.547262 0 398.148973 149.360049 398.148973 332.964812l28.437922 0c0-199.607302-190.991939-361.411765-426.586895-361.411765S88.167493 811.4245 88.167493 1011.031802l28.437922 0C116.605415 827.427039 295.207126 678.057959 514.754388 678.057959z"
                            p-id="2705" fill="#888888"></path>
                    </svg>
                    <span>{{ articleinfo.author }}</span>
                </div>

                <div>
                    <span style="font-style: oblique; font-weight: bold;">{{ articleinfo.tag }}</span>
                </div>

                <div class="time">
                    <svg t="1675072336730" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="3791" width="16" height="16">
                        <path
                            d="M511.333 127.333c51.868 0 102.15 10.144 149.451 30.15 45.719 19.337 86.792 47.034 122.078 82.321 35.287 35.286 62.983 76.359 82.321 122.078 20.006 47.3 30.15 97.583 30.15 149.451s-10.144 102.15-30.15 149.451c-19.337 45.719-47.034 86.792-82.321 122.078-35.286 35.287-76.359 62.983-122.078 82.321-47.3 20.006-97.583 30.15-149.451 30.15s-102.15-10.144-149.451-30.15c-45.719-19.337-86.792-47.034-122.078-82.321-35.287-35.286-62.983-76.359-82.321-122.078-20.006-47.3-30.15-97.583-30.15-149.451s10.144-102.15 30.15-149.451c19.337-45.719 47.034-86.792 82.321-122.078 35.286-35.287 76.359-62.983 122.078-82.321 47.301-20.006 97.583-30.15 149.451-30.15m0-64c-247.424 0-448 200.576-448 448s200.576 448 448 448 448-200.576 448-448-200.576-448-448-448z"
                            fill="#888888" p-id="3792"></path>
                        <path
                            d="M702.856 543.333H511.333c-17.673 0-32-14.326-32-32v-286.73c0-17.673 14.327-32 32-32s32 14.327 32 32v254.73h159.522c17.673 0 32 14.327 32 32s-14.326 32-31.999 32z"
                            fill="#888888" p-id="3793"></path>
                    </svg>
                    <span>{{ articleinfo.createTime | dateFormat }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    props: ['articleinfo'],
    data() {
        return {
            baseURL:'http://127.0.0.1:3000'
        }
    },
    filters: {
        dateFormat(value) {
            return moment(value).format('YYYY-MM-DD')
        }
    },
    methods: {
        toDetial() {

            //直接跳转
            this.$router.push({ path: '/articleDetial', query: { id: this.articleinfo.id } })

            //新标签页
            // let Detail=this.$router.resolve({
            //     path:'/articleDetial',
            //     query:{id:this.articleinfo.id}
            // });
            // window.open(Detail.href,'_blank')
        }
    }
}
</script>

<style scoped lang='less'>
.articleCard {
    width: 100%;
    padding: 20px 15px 20px 15px;
    border-bottom: 1px solid #ececec;
    border-radius: 5px;
    overflow: hidden;
    background-color: #fff;
    cursor: pointer;
    display: flex;

    .pic {
        width: 100px;
        height: 100px;
        flex-shrink: 0;
        border:1px solid #e6e6e6;
        text-align: center;
        padding:2px;
        overflow: hidden;

        img {
            // width: 70%;
            height: 100%;
        }
    }

    .content {
        margin-left: 10px;
        .title {
            color: #555;
            font-weight: bold;
            font-size: 17px;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;

            span {
                font-size: 16px;
                margin-right: 2px;
            }

            .Original {
                color: #ff8080;
            }

            .noOriginal {
                color: #1482ff;
            }
        }

        .desc {
            margin-top: 10px;
            font-size: 14px;
            color: #555;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
        }

        .info {
            color: #777;
            margin-top: 20px;
            font-size: 13px;
            display: flex;
            align-items: center;

            &>div {
                display: flex;
                align-items: center;
                padding-right: 20px;

                span {
                    margin-left: 3px;
                }
            }
        }
    }
}
</style>