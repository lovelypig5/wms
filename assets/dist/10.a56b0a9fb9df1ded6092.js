webpackJsonp([10],{90:function(t,a,e){var o,i;o=e(91),i=e(92),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports["default"]),i&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=i)},91:function(t,a,e){(function(t,o){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(a,"__esModule",{value:!0});var d=e(55),s=i(d),n=e(52),r=i(n),l=t.extend({name:"outList",data:function(){return{outList:[],loading:{fetch:!1},params:{page:1,pageSize:10,count:0,type:1}}},ready:function(){this.fetch(!0)},methods:{fetch:function(t){var a=this;t?a.params={page:1,pageSize:10,count:0,type:1}:a.params.page+=1,a.loading.fetch||(a.loading.fetch=!a.loading.fetch,o.ajax({url:s["default"].outList,data:a.params,success:function(t){a.outList=t.content,a.params.total=t.total,a.params.totalPage=t.total/a.params.pageSize},error:function(t){a.alert({show:!0,msg:"拉取出库记录失败",type:"error"})}}).always(function(){a.loading.fetch=!a.loading.fetch}))}},vuex:{actions:{alert:r["default"].alert}}});a["default"]=l}).call(a,e(9),e(8))},92:function(t,a){t.exports='<div class="panel panel-primary good-list"> <div class=panel-heading>出库记录</div> <table class=table v-if="!loading.fetch && outList.length > 0"> <thead> <tr> <th>商品名称</th> <th>商品属性</th> <th>出库数量</th> <th>出库价格</th> <th>出库时间</th> </tr> </thead> <tbody> <tr class=item v-for="good in outList"> <td><a href=javascript:void(0) v-link="{name: \'detail\', params: {id: good.goods_id} }">{{good.name}}</a></td> <td>{{good.goods_attr | remove-whitespace}}</td> <td>{{good.amount}}</td> <td>{{good.price}}</td> <td>{{good.date}}</td> </tr> </tbody> </table> <div class=empty v-if="!loading.fetch && outList.length == 0"> <div class=msg>没有出库记录</div> </div> <div v-if=loading.fetch> <div class="loading audio-wave"></div> </div> </div>'}});
//# sourceMappingURL=10.a56b0a9fb9df1ded6092.js.map