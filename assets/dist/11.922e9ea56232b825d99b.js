webpackJsonp([11],{91:function(t,a,o){var d,e;d=o(92),e=o(93),t.exports=d||{},t.exports.__esModule&&(t.exports=t.exports["default"]),e&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=e)},92:function(t,a,o){(function(t,d){"use strict";function e(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(a,"__esModule",{value:!0});var i=o(72),s=e(i),r=o(55),n=e(r),l=o(52),c=e(l),u=t.extend({name:"goodList",data:function(){return{attrlist:[],good:{name:"",list:[]},loading:{fetch:!1,add:!1}}},ready:function(){this.fetch(!0),this.fetchAttrList(),d(this.$el).on("click",".save",this.addAttr),d(".add-attr").popover({content:function(){return'<input type="text" placeholder="请输入属性名称" class="attrName"/><button class="btn-primary save">保存</button>'},html:!0})},methods:{addAttr:function(){var t=this,a=d(this.$el).find(".attrName").val();a&&a.trim()&&(t.loading.add||(t.loading.add=!t.loading.add,d.ajax({url:n["default"].addAttr,type:"post",data:(0,s["default"])({attr:a,goods_id:this.good.id}),success:function(o){t.alert({show:!0,msg:"添加成功",type:"success"}),t.attrlist.push({attr:a}),d(t.$el).find(".attrName").val(""),d(".add-attr").popover("hide")},error:function(a){t.alert({show:!0,msg:a.responseText||"添加商品属性失败",type:"error"})}}).always(function(){t.loading.add=!t.loading.add})))},fetch:function(t){var a=this;a.loading.fetch||(a.loading.fetch=!a.loading.fetch,d.ajax({url:n["default"].goodsDetail,data:{id:this.$route.params.id},success:function(t){a.good=t},error:function(t){a.alert({show:!0,msg:"获取商品详情失败",type:"error"})}}).always(function(){a.loading.fetch=!a.loading.fetch}))},fetchAttrList:function(t){var a=this;d.ajax({url:n["default"].goodsAttrs,data:{good_id:this.$route.params.id},success:function(o){a.attrlist=o,t&&"function"==typeof t&&t()},error:function(){a.attrlist=[]}})}},vuex:{actions:{alert:c["default"].alert}}});a["default"]=u}).call(a,o(9),o(8))},93:function(t,a){t.exports='<div class="panel panel-primary good-detail"> <div class=panel-heading>{{good.name}}</div> <div class=attList> <table class=table> <thead> <tr> <th>属性列表<span class=add-attr data-container=.good-detail data-toggle=popover data-placement=bottom>+</span></th> </tr> </thead> <tbody> <tr> <td> <span v-for="attr in attrlist" class=attr>{{attr.attr}}</span> </td> </tr> </tbody> </table> </div> <table class=table v-if=!loading.fetch> <thead> <tr> <th>库存列表</th> <th>库存数量</th> <th>操作</th> <th>趋势</th> </tr> </thead> <tbody> <tr class=item> <td>所有</td> <td>{{good.total}}</td> <td> </td> <td> <a href=javascript:void(0) v-link="{path: \'/goods/analysis\'}">趋势</a> </td> </tr> <tr class=item v-for="g in good.list"> <td>{{g.attr | remove-whitespace}}</td> <td>{{g.count}}</td> <td> <a href=javascript:void(0) v-link="{path: \'/goods/in\', query: {id: good.id, name: good.name, attr: g.attr} }">入库</a> <a href=javascript:void(0) v-link="{path: \'/goods/out\', query: {id: good.id, name: good.name, attr: g.attr} }">出库</a> </td> <td> <a href=javascript:void(0) v-link="{path: \'/goods/analysis\'}">趋势</a> </td> </tr> </tbody> </table> <div v-if=loading.fetch> <div class="loading audio-wave"></div> </div> </div>'}});
//# sourceMappingURL=11.922e9ea56232b825d99b.js.map