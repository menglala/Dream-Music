webpackJsonp([7],{LrZH:function(s,t){},rVW4:function(s,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("Dd8w"),a=i.n(n),e=i("gyMJ"),o=(i("P8pk"),i("bszs")),r=i("SC/i"),c=i("NYxO"),l=i("cUSj"),d={data:function(){return{disstid:"",songsList:[],scrollY:0,imgHeight:0}},computed:a()({},Object(c.c)(["disc"])),created:function(){this.normalizeSongs()},methods:a()({},Object(c.b)(["randomPlay"]),{normalizeSongs:function(){var s=this;this.disc.dissid?Object(e.b)(this.disc.dissid).then(function(t){s.songsList=t.cdlist[0].songlist}).catch(function(s){return console.log(s)}):this.$router.push("/recommend")},random:function(){var s=[];this.songsList.forEach(function(t){s.push(Object(l.a)(t))}),this.randomPlay({list:s})},back:function(){this.$router.push("/recommend")},scroll:function(s){s.target;this.scrollY=s.target.scrollTop},initListTop:function(){var s=this.$refs.bgImg;this.imgHeight=s.clientHeight,this.$refs.musicList.style.top=this.imgHeight+"px"}}),mounted:function(){var s=this;setTimeout(function(){s.initListTop()},200)},watch:{scrollY:function(s){var t=this.$refs.bgImg,i=this.$refs.randomPlay,n=40-this.imgHeight,a=0,e=this.$refs.layer;-s<n?(t.style.padding=0,t.style.height="40px",a=100,i.style.display="none"):(t.style.paddingTop="70%",t.style.height="",a=0,i.style.display="");var o=Math.max(n,-s);e.style.transform="translate3d(0,"+o+"px,0)",e.style.webkitTransform="translate3d(0,"+o+"px,0)",t.style["z-index"]=a}},components:{songsList:o.a,loading:r.a}},g={render:function(){var s=this,t=s.$createElement,i=s._self._c||t;return i("div",{staticClass:"disc-wrapper",on:{scroll:s.scroll}},[i("div",{ref:"bgImg",staticClass:"bgImg",style:{backgroundImage:"url("+s.disc.imgurl+")"}},[i("div",{staticClass:"icon",on:{click:s.back}},[i("i",{staticClass:"icon-back"})]),s._v(" "),i("h1",{domProps:{innerHTML:s._s(s.disc.dissname)}}),s._v(" "),i("div",{ref:"randomPlay",staticClass:"play-wrapper"},[s.songsList.length?i("div",{staticClass:"icon-autoplay",on:{click:s.random}},[i("i",{staticClass:"icon-play"}),s._v(" "),i("span",[s._v("随机播放全部")])]):s._e()]),s._v(" "),i("div",{staticClass:"filter"}),s._v(" "),i("div",{ref:"layer",staticClass:"layer"})]),s._v(" "),i("div",{ref:"musicList",staticClass:"listWrapper"},[i("songs-list",{attrs:{songsList:s.songsList}})],1),s._v(" "),s.songsList.length?s._e():i("div",{staticClass:"loading-wrapper"},[i("loading")],1)])},staticRenderFns:[]};var h=i("VU/8")(d,g,!1,function(s){i("LrZH")},"data-v-0d79498a",null);t.default=h.exports}});
//# sourceMappingURL=7.56c92d727393bb77b0f5.js.map