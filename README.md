Dream-Music webApp
介绍
这个项目来源于慕课网上的大神huangyi老师的vue-music课程,由于我未购买该课程,源码也未开源。按照老师给的项目线上地址及控制台的source，在自己的理解和改进下实现了该项目。
数据来源于QQ音乐的接口，使用JSONP以及axios解决跨域请求（开发环境下）。但由于本人没有服务器，所以打包到github-pages上预览时，推荐歌单和歌词接口未能获取到，下面是简陋版预览地址：
扫一扫手机预览（ios由于vue版本问题可能会出现无法播放歌曲的情况)
https://github.com/menglala/readmeImg/blob/master/vue-music/1537521902.png

效果截图
https://github.com/menglala/readmeImg/blob/master/gif/1.gif
https://github.com/menglala/readmeImg/blob/master/gif/2.gif
https://github.com/menglala/readmeImg/blob/master/gif/3.gif
https://github.com/menglala/readmeImg/blob/master/gif/4.gif
https://github.com/menglala/readmeImg/blob/master/gif/5.gif
https://github.com/menglala/readmeImg/blob/master/gif/6.gif
https://github.com/menglala/readmeImg/blob/master/gif/7.gif

技术栈
·vue，vuex，vue-router，axios
·less
·jsonp，ES6，promise
·vue-awesome-swiper，better-scroll等前端库
·webpack，eslint，vue-cli

组件
·可在其他项目复用的基础组件：comfirm.vue，loading.vue ,Mheader.vue,scroll.vue....共14个基础组件
·与该项目业务逻辑相关的页面组件：player.vue,rank.vue,search.vue,singer.vue.....共12个业务组件

安装与运行：
git clone https://github.com/menglala/Dream-Music.git
cd Dream-Music
npm install 
npm run dev // 服务端运行
npm build // 项目打包