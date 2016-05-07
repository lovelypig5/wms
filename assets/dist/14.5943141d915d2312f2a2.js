webpackJsonp([14],{253:function(t,a,o){var e,i;e=o(254),i=o(255),t.exports=e||{},t.exports.__esModule&&(t.exports=t.exports["default"]),i&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=i)},254:function(t,a,o){(function(t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var o=t.extend({props:["pagination","change"],methods:{back10:function(){var t=this.pagination.page-10<1?1:this.pagination.page-10;this.change(t)},forword10:function(){var t=this.pagination.page+10>this.pagination.count?this.pagination.count:this.pagination.page+10;this.change(t)}}});a["default"]=o}).call(a,o(10))},255:function(t,a){t.exports='<nav class=center> <ul class=pagination v-show="pagination.count > 1"> <li :class="{disabled: pagination.page == 1}" @click=back10> <a href=javascript:void(0) aria-label=Previous> <span aria-hidden=true>&laquo;</span> </a> </li> <li v-for="i in pagination.count" :class="{active: pagination.page == i + 1}" @click=change(i+1)><a href=javascript:void(0)>{{ i + 1 }}</a></li> <li :class="{disabled: pagination.page == pagination.count}" @click=forword10> <a href=javascript:void(0) aria-label=Next> <span aria-hidden=true>&raquo;</span> </a> </li> </ul> </nav>'},269:function(t,a,o){var e,i;e=o(270),i=o(271),t.exports=e||{},t.exports.__esModule&&(t.exports=t.exports["default"]),i&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=i)},270:function(t,a,o){(function(t,e){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(a,"__esModule",{value:!0});var n=o(64),r=i(n),s=o(61),d=i(s),c=o(253),p=i(c),l=t.extend({name:"orderList",components:{pagination:p["default"]},data:function(){return{orderList:[],loading:{fetch:!1,fetchGood:!1},params:{page:1,pageSize:10,count:0}}},ready:function(){this.fetch(!0)},methods:{change:function(t){this.params.page=t,this.fetch()},fetch:function(t){var a=this;t&&(a.params={page:1,pageSize:10,count:0}),a.loading.fetch||(a.loading.fetch=!a.loading.fetch,e.ajax({url:r["default"].orderList,data:a.params,success:function(t){a.orderList=t.content,a.params.count=Math.ceil(t.count/a.params.pageSize)},error:function(t){a.alert({show:!0,msg:"拉取订单列表失败",type:"error"})}}).always(function(){a.loading.fetch=!a.loading.fetch}))},expand:function(a){var o=this;o.loading.fetchGood||(o.loading.fetchGood=!o.loading.fetchGood,e.ajax({url:r["default"].orderDetail,data:{order_id:a.id},success:function(o){t.set(a,"goodList",o)},error:function(t){o.alert({show:!0,msg:"获取订单商品失败",type:"error"})}}).always(function(){o.loading.fetchGood=!o.loading.fetchGood}))}},vuex:{actions:{alert:d["default"].alert}}});a["default"]=l}).call(a,o(10),o(9))},271:function(t,a){t.exports='<div class="panel panel-primary good-list"> <div class=panel-heading>订单列表</div> <table class=table v-if="!loading.fetch && orderList.length > 0"> <thead> <tr> <th>订单号</th> <th>快递单号</th> <th>快递费用</th> <th>收件人</th> <th>操作</th> </tr> </thead> <tbody> <tr class=item v-for="order in orderList"> <td> {{order.id}} </td> <td>{{order.expressId}}</td> <td> {{order.expressCost}} </td> <td> {{order.name}} </td> <td><a href=javascript:void(0) @click=expand(order) v-if=!order.goodList>展开</a> <div v-if="order.goodList && order.goodList.length > 0" v-for="good in order.goodList"> <span>{{ good.name }}</span> <span>{{ good.goods_attr }}</span> <span>{{ good.amount }}</span> </div> </td> </tr> </tbody> </table> <pagination :pagination=params :change=change></pagination> <div class=empty v-if="!loading.fetch && orderList.length == 0"> <div class=msg>商品列表为空</div> </div> <div v-if=loading.fetch> <div class="loading audio-wave"></div> </div> </div>'}});
//# sourceMappingURL=14.5943141d915d2312f2a2.js.map