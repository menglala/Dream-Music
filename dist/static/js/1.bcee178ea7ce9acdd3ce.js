webpackJsonp([1],{VuR8:function(t,s,i){"use strict";var n=i("Zrlr"),a=i.n(n);s.a=function t(s){var i=s.mid,n=s.name;a()(this,t),this.mid=i,this.name=n,this.bgImage="https://y.gtimg.cn/music/photo_new/T001R300x300M000"+this.mid+".jpg?max_age=2592000"}},ZzRA:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var n=i("Dd8w"),a=i.n(n),e=i("gyMJ"),r=i("P8pk"),o=i("VuR8"),c=i("bszs"),l=i("SC/i"),g=i("NYxO"),d=i("cUSj"),h={data:function(){return{id:"",singer:{},songsList:[],scrollY:0,imgHeight:0}},created:function(){this.id=this.$route.params.id,this.id||this.$router.push("/singer"),this._getSingerInfo()},methods:a()({},Object(g.b)(["randomPlay"]),{_getSingerInfo:function(){var t=this;Object(e.f)(this.id).then(function(s){if(s.code===r.a){var i=s.data;t.songsList=i.list,t.singer=new o.a({mid:i.singer_mid,name:i.singer_name})}}).catch(function(t){return console.log(t)})},random:function(){var t=[];this.songsList.forEach(function(s){t.push(Object(d.a)(s.musicData))}),this.randomPlay({list:t})},back:function(){this.$router.back()},scroll:function(t){t.target;this.scrollY=t.target.scrollTop},initListTop:function(){var t=this.$refs.bgImg;this.imgHeight=t.clientHeight,this.$refs.musicList.style.top=this.imgHeight+"px"}}),mounted:function(){var t=this;setTimeout(function(){t.initListTop()},200)},watch:{scrollY:function(t){var s=this.$refs.bgImg,i=this.$refs.randomPlay,n=40-this.imgHeight,a=0,e=this.$refs.layer;-t<n?(s.style.padding=0,s.style.height="40px",a=100,i.style.display="none"):(s.style.paddingTop="70%",s.style.height="",a=0,i.style.display="");var r=Math.max(n,-t);e.style.transform="translate3d(0,"+r+"px,0)",e.style.webkitTransform="translate3d(0,"+r+"px,0)",s.style["z-index"]=a}},components:{songsList:c.a,loading:l.a}},u={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"singer-detail",on:{scroll:t.scroll}},[i("div",{ref:"bgImg",staticClass:"bgImg",style:{backgroundImage:"url("+t.singer.bgImage+")"}},[i("div",{staticClass:"icon",on:{click:t.back}},[i("i",{staticClass:"icon-back"})]),t._v(" "),i("h1",{domProps:{innerHTML:t._s(t.singer.name)}}),t._v(" "),i("div",{ref:"randomPlay",staticClass:"play-wrapper"},[t.songsList.length?i("div",{staticClass:"icon-autoplay",on:{click:t.random}},[i("i",{staticClass:"icon-play"}),t._v(" "),i("span",[t._v("随机播放全部")])]):t._e()]),t._v(" "),i("div",{staticClass:"filter"}),t._v(" "),i("div",{ref:"layer",staticClass:"layer"})]),t._v(" "),i("div",{ref:"musicList",staticClass:"listWrapper"},[i("songs-list",{attrs:{songsList:t.songsList}})],1),t._v(" "),t.songsList.length?t._e():i("div",{staticClass:"loading-wrapper"},[i("loading")],1)])},staticRenderFns:[]};var m=i("VU/8")(h,u,!1,function(t){i("hPzc")},"data-v-9e94fbde",null);s.default=m.exports},hPzc:function(t,s){}});
//# sourceMappingURL=1.bcee178ea7ce9acdd3ce.js.map