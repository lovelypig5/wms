webpackJsonp([13,17],{DLZF:function(t,a,d){"use strict";(function(t,o){function e(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(a,"__esModule",{value:!0});var i=d("yjFh"),s=e(i),r=d("LJdO"),n=e(r),l=d("k06x"),c=e(l),u=d("UY0x"),v=e(u),f=t.extend({template:n.default,name:"goodList",data:function(){return{attrlist:[],good:{name:"",list:[]},loading:{fetch:!1,add:!1}}},ready:function(){this.fetch(!0),this.fetchAttrList(),o(this.$el).on("click",".save",this.addAttr),o(".add-attr").popover({content:function(){return'<input type="text" placeholder="请输入属性名称" class="attrName"/><button class="btn-primary save">保存</button>'},html:!0})},methods:{addAttr:function(){var t=this,a=o(this.$el).find(".attrName").val();a&&a.trim()&&(t.loading.add||(t.loading.add=!t.loading.add,o.ajax({url:c.default.addAttr,type:"post",data:(0,s.default)({attr:a,goods_id:this.good.id}),success:function(d){t.alert({show:!0,msg:"添加成功",type:"success"}),t.attrlist.push({attr:a}),o(t.$el).find(".attrName").val(""),o(".add-attr").popover("hide")},error:function(a){t.alert({show:!0,msg:a.responseText||"添加商品属性失败",type:"error"})}}).always(function(){t.loading.add=!t.loading.add})))},fetch:function(t){var a=this;a.loading.fetch||(a.loading.fetch=!a.loading.fetch,o.ajax({url:c.default.goodsDetail,data:{id:this.$route.params.id},success:function(t){a.good=t},error:function(t){a.alert({show:!0,msg:"获取商品详情失败",type:"error"})}}).always(function(){a.loading.fetch=!a.loading.fetch}))},fetchAttrList:function(t){var a=this;o.ajax({url:c.default.goodsAttrs,data:{good_id:this.$route.params.id},success:function(d){a.attrlist=d,t&&"function"==typeof t&&t()},error:function(){a.attrlist=[]}})}},vuex:{actions:{alert:v.default.alert}}});a.default=f}).call(a,d("I3G/"),d("7t+N"))},LJdO:function(t,a){t.exports='<div> <div class=row> <div class=col-lg-12> <h1 class=page-header>{{good.name}}</h1> </div> </div> <div class=row> <div class=col-lg-12> <div class="panel panel-primary good-detail"> <div class=panel-heading> <i class="fa fa-bar-chart-o fa-fw"></i> {{good.name}} </div> <div class=panel-body> <div class=row> <div class=col-lg-12> <div class=table-responsive> <div class=attList> <table class=table> <thead> <tr> <th>属性列表<span class=add-attr data-container=.good-detail data-toggle=popover data-placement=bottom>+</span></th> </tr> </thead> <tbody> <tr> <td> <span v-for="attr in attrlist" class=attr>{{attr.attr}}</span> </td> </tr> </tbody> </table> </div> <table class="table table-bordered table-hover table-striped" v-if=!loading.fetch> <thead> <tr> <th>库存列表</th> <th>库存数量</th> <th>操作</th> <th>趋势</th> </tr> </thead> <tbody> <tr class=item> <td>所有</td> <td>{{good.total}}</td> <td> </td> <td> <a href=javascript:void(0) v-link="{path: \'/goods/analysis\'}">趋势</a> </td> </tr> <tr class=item v-for="g in good.list"> <td>{{g.attrs | join-attrs}}</td> <td>{{g.count}}</td> <td> <a href=javascript:void(0) v-link="{path: \'/goods/in\', query: {id: good.id, name: good.name, attr: g.attr} }">入库</a> <a href=javascript:void(0) v-link="{path: \'/goods/out\', query: {id: good.id, name: good.name, attr: g.attr} }">出库</a> </td> <td> <a href=javascript:void(0) v-link="{path: \'/goods/analysis\'}">趋势</a> </td> </tr> </tbody> </table> <div v-if=loading.fetch> <div class="loading audio-wave"></div> </div> </div> </div> </div> </div> </div> </div> </div> </div> '},YqVz:function(t,a,d){var o,e,i={};o=d("DLZF"),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports.default);var s="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;e&&(s.template=e),s.computed||(s.computed={}),Object.keys(i).forEach(function(t){var a=i[t];s.computed[t]=function(){return a}})}});
//# sourceMappingURL=13.7bb21858ce4e30b1f5b2.js.map