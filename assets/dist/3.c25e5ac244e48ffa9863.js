webpackJsonp([3],{68:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o={goodsMenu:["text_goods_state","text_goods_list","text_goods_out","text_goods_in","text_goods_outlist","text_goods_inlist","text_goods_create"],orderMenu:["text_order_list","text_order_create"],select2:{zh:{errorLoading:function(){return"无法载入结果。"},inputTooLong:function(t){var e=t.input.length-t.maximum,o="请删除"+e+"个字符";return o},inputTooShort:function(t){var e=t.minimum-t.input.length,o="请再输入至少"+e+"个字符";return o},loadingMore:function(){return"载入更多结果…"},maximumSelected:function(t){var e="最多只能选择"+t.maximum+"个项目";return e},noResults:function(){return"未找到结果"},searching:function(){return"搜索中…"}}}};e["default"]=o},70:function(t,e,o){var n,i,r={};n=o(71),i=o(72),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports["default"]);var s="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;i&&(s.template=i),s.computed||(s.computed={}),Object.keys(r).forEach(function(t){var e=r[t];s.computed[t]=function(){return e}})},71:function(t,e,o){(function(t){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var i=o(68),r=n(i),s=o(61),u=n(s),a=t.extend({name:"goods",data:function(){return{menu:r["default"].goodsMenu,path:["/analysis","/list","/out","/in","/outList","/inList","/create"]}},ready:function(){this.isLogin()},methods:{change:function(t){this.selectIdx=t}},vuex:{getters:{user:function(t){return t.user}},actions:{isLogin:u["default"].isLogin}}});e["default"]=a}).call(e,o(10))},72:function(t,e){t.exports=' <div class=container v-if=user.id> <div class=col-sm-3> <div class=list-group> <a href=javascript:void(0) v-link="{path: \'/goods\' + path[$index], activeClass:\'active\'}" class=list-group-item v-for="item in menu">{{ $t(item) }} </a> </div> </div> <div class="col-sm-9 content"> <router-view transition=fade transition-mode=out-in></router-view> </div> </div> '}});
//# sourceMappingURL=3.c25e5ac244e48ffa9863.js.map