webpackJsonp([5],{"0OsI":function(t,s){},"7biW":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var r=e("Dd8w"),a=e.n(r),c=e("HtZA"),i=e("gWrr"),o=e("gyMJ"),n=e("NYxO"),u=e("Ewld"),h=e("8icn"),l={mixins:[e("F4+m").b],data:function(){return{hotkeys:[],query:"",showFlag:!1}},created:function(){this._getHotKey()},computed:{shortcut:function(){return this.hotkeys.concat(this.searchHistory)}},methods:a()({},Object(n.b)(["clearSearchHistory"]),{showConfirm:function(){this.$refs.confirm.show()},_getHotKey:function(){var t=this;Object(o.c)().then(function(s){0===s.code&&(t.hotkeys=s.data.hotkey.slice(0,10))})},queryChange:function(t){this.query=t}}),watch:{query:function(t){var s=this;t||setTimeout(function(){s.$refs.shortcut.refresh()},20)}},components:{searchBox:c.a,suggest:i.a,scroll:u.a,confirm:h.a}},v={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"search-wrapper"},[e("div",{staticClass:"search-box-wrapper"},[e("search-box",{ref:"searchBox",on:{query:t.queryChange}})],1),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!t.query,expression:"!query"}],staticClass:"shortcut-wrapper"},[e("scroll",{ref:"shortcut",staticClass:"shortcut",attrs:{data:t.shortcut}},[e("div",[e("div",{staticClass:"hot-keys-wrapper"},[e("h1",[t._v("热门搜索")]),t._v(" "),e("ul",{staticClass:"hot-keys"},t._l(t.hotkeys,function(s,r){return e("li",{key:r,on:{click:function(e){t.addQuery(s.k)}}},[e("span",[t._v(t._s(s.k))])])}))]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.searchHistory.length,expression:"searchHistory.length"}],staticClass:"search-history"},[e("h1",[e("span",{staticClass:"title"},[t._v("搜索历史")]),t._v(" "),e("span",{staticClass:"icon",on:{click:t.showConfirm}},[e("i",{staticClass:"icon-clear"})])]),t._v(" "),e("ul",{staticClass:"search-list"},t._l(t.searchHistory,function(s,r){return e("li",{key:r,on:{click:function(e){t.addQuery(s)}}},[e("span",{staticClass:"text",domProps:{innerHTML:t._s(s)}}),t._v(" "),e("span",{staticClass:"icon",on:{click:function(e){e.stopPropagation(),t.deleteSearchHistory(s)}}},[e("i",{staticClass:"icon-delete"})])])}))])])])],1),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.query,expression:"query"}],staticClass:"search-result"},[e("suggest",{attrs:{query:t.query},on:{listenScroll:t.blurInp,select:t.saveSearchHistory}})],1),t._v(" "),e("confirm",{ref:"confirm",attrs:{text:"确定要所有清空历史记录吗?",confirmText:"清空"},on:{confirm:t.clearSearchHistory}}),t._v(" "),e("router-view")],1)},staticRenderFns:[]};var f=e("VU/8")(l,v,!1,function(t){e("0OsI")},"data-v-bef22b9a",null);s.default=f.exports}});
//# sourceMappingURL=5.ffd36bfe66954165ff5f.js.map