webpackJsonp([10],{100:function(t,a,e){var o,i;o=e(101),i=e(102),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports["default"]),i&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=i)},101:function(t,a,e){(function(t,o){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(a,"__esModule",{value:!0});var d=e(51),n=i(d),s=e(48),l=i(s),r=t.extend({name:"inList",data:function(){return{inList:[],loading:{fetch:!1},params:{page:1,pageSize:10,count:0}}},ready:function(){this.fetch(!0)},methods:{fetch:function(t){var a=this;t?a.params={page:1,pageSize:10,count:0}:a.params.page+=1,a.loading.fetch||(a.loading.fetch=!a.loading.fetch,o.ajax({url:n["default"].inList,data:a.params,success:function(t){a.inList=t.content,a.params.total=t.total,a.params.totalPage=t.total/a.params.pageSize},error:function(t){a.alert({show:!0,msg:"拉取入库记录失败",type:"error"})}}).always(function(){a.loading.fetch=!a.loading.fetch}))}},vuex:{actions:{alert:l["default"].alert}}});a["default"]=r}).call(a,e(8),e(7))},102:function(t,a){t.exports='<div class="panel panel-primary good-list"> <div class=panel-heading>入库记录</div> <table class=table v-if="!loading.fetch && inList.length > 0"> <thead> <tr> <th>商品名称</th> <th>商品属性</th> <th>入库数量</th> <th>入库价格</th> <th>入库时间</th> </tr> </thead> <tbody> <tr class=item v-for="good in inList"> <td><a href=javascript:void(0) v-link="{path: \'/goods/detail/\'+good.goods_id}">{{good.name}}</a></td> <td>{{good.goods_attr | remove-whitespace}}</td> <td>{{good.amount}}</td> <td>{{good.price}}</td> <td>{{good.date}}</td> </tr> </tbody> </table> <div class=empty v-if="!loading.fetch && inList.length == 0"> <div class=msg>没有入库记录</div> </div> <div v-if=loading.fetch> <div class="loading audio-wave"></div> </div> </div>'}});
//# sourceMappingURL=10.3da476829e6395b6f398.js.map