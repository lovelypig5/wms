webpackJsonp([13],{109:function(t,e,o){var a,i;a=o(110),i=o(111),t.exports=a||{},t.exports.__esModule&&(t.exports=t.exports["default"]),i&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=i)},110:function(t,e,o){(function(t,a){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var d=o(51),n=i(d),s=o(48),l=i(s),r=t.extend({name:"goodAttr",data:function(){return{good:{name:"",list:[]},loading:{fetch:!1}}},ready:function(){this.fetch(!0)},methods:{fetch:function(t){var e=this;e.loading.fetch||(e.loading.fetch=!e.loading.fetch,a.ajax({url:n["default"].goodsDetail,data:{id:this.$route.params.id},success:function(t){e.good=t},error:function(t){e.alert({show:!0,msg:"获取商品详情失败",type:"error"})}}).always(function(){e.loading.fetch=!e.loading.fetch}))}},vuex:{actions:{alert:l["default"].alert}}});e["default"]=r}).call(e,o(8),o(7))},111:function(t,e){t.exports='<div class="panel panel-primary good-attr"> <div class=panel-heading>{{good.name}}</div> <table class=table v-if=!loading.fetch> <thead> <tr> <th>属性列表</th> <th>操作</th> </tr> </thead> <tbody> <tr class=item v-for="g in good.list"> <td>{{g.attr}}</td> <td> <a href=javascript:void(0) v-link="{path: \'/goods/analysis\'}">趋势</a> </td> </tr> <tr class=item v-if="good.list.length==0"> <td colspan=2>还没有属性，赶紧创建吧</td> </tr> </tbody> </table> <div v-if=loading.fetch> <div class="loading audio-wave"></div> </div> </div>'}});
//# sourceMappingURL=13.3da476829e6395b6f398.js.map