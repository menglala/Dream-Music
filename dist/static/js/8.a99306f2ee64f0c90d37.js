webpackJsonp([8],{"1Bo8":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var n=e("Dd8w"),r=e.n(n),i=e("UQ9d"),o=e("NYxO"),a=e("/Bfu"),c=e("Ewld"),l=e("rXHm"),u={data:function(){return{switches:[{name:"我喜欢的"},{name:"最近播放"}],currentIndex:0}},computed:r()({},Object(o.c)(["favoriteList","playHistory"]),{noResult:function(){return 0===this.currentIndex?!this.favoriteList.length:!this.playHistory.length},noResultDesc:function(){return 0===this.currentIndex?"暂无收藏歌曲":"你还没有听过歌曲"}}),methods:r()({},Object(o.b)(["insertSong","randomPlay"]),{refreshList:function(){var t=this;setTimeout(function(){0===t.currentIndex?t.$refs.favoritelist.refresh():t.$refs.historyScroll.refresh()},20)},switchIndex:function(t){this.currentIndex=t},selectItem:function(t){this.insertSong(t)},back:function(){this.$router.back()},random:function(){var t=0===this.currentIndex?this.favoriteList:this.playHistory;t.length&&this.randomPlay({list:t})}}),watch:{currentIndex:function(t){var s=this;setTimeout(function(){s.refreshList()},20)}},mounted:function(){var t=this;setTimeout(function(){t.refreshList()},20)},components:{Switches:i.a,songs:a.a,scroll:c.a,NoResult:l.a}},d={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"user-center",on:{click:function(t){t.stopPropagation()}}},[e("div",{staticClass:"icon header"},[e("i",{staticClass:"icon-back",on:{click:function(s){return s.stopPropagation(),t.back(s)}}}),t._v(" "),e("switches",{attrs:{switches:t.switches,currentIndex:t.currentIndex},on:{switch:t.switchIndex,click:function(t){t.stopPropagation()}}})],1),t._v(" "),e("div",{staticClass:"icon play-btn",on:{click:function(s){return s.stopPropagation(),t.random(s)}}},[e("i",{staticClass:"icon-play"}),t._v(" "),e("span",{staticClass:"text"},[t._v("\n      随机播放全部\n    ")])]),t._v(" "),e("div",{staticClass:"list-wrapper"},[0===t.currentIndex?e("scroll",{ref:"favoritelist",staticClass:"list-scroll",attrs:{data:t.favoriteList}},[e("div",{staticClass:"list-inner"},[e("songs",{attrs:{songs:t.favoriteList},on:{select:t.selectItem}})],1)]):t._e(),t._v(" "),e("scroll",{directives:[{name:"show",rawName:"v-show",value:1===t.currentIndex,expression:"currentIndex===1"}],ref:"historyScroll",staticClass:"list-scroll",attrs:{data:t.playHistory}},[e("songs",{attrs:{songs:t.playHistory},on:{select:t.selectItem}})],1)],1),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.noResult,expression:"noResult"}],staticClass:"no-result-wrapper"},[e("no-result",{attrs:{title:t.noResultDesc}})],1)])},staticRenderFns:[]};var f=e("VU/8")(u,d,!1,function(t){e("Bw66")},"data-v-01edfd8b",null);s.default=f.exports},Bw66:function(t,s){}});
//# sourceMappingURL=8.a99306f2ee64f0c90d37.js.map