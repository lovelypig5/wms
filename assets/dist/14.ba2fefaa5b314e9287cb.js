webpackJsonp([14],{254:function(t,a,e){var o,i;o=e(255),i=e(256),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports["default"]),i&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=i)},255:function(t,a,e){(function(t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=t.extend({props:["pagination","change"],methods:{back10:function(){if(!(this.pagination.page<=1)){var t=this.pagination.page-10<1?1:this.pagination.page-10;this.change(t)}},forword10:function(){if(!(this.pagination.page>=this.pagination.count)){var t=this.pagination.page+10>this.pagination.count?this.pagination.count:this.pagination.page+10;this.change(t)}}}});a["default"]=e}).call(a,e(10))},256:function(t,a){t.exports='<nav class=center> <ul class=pagination v-show="pagination.count > 1"> <li :class="{disabled: pagination.page <= 1}" @click=back10> <a href=javascript:void(0) aria-label=Previous> <span aria-hidden=true>&laquo;</span> </a> </li> <li v-for="i in pagination.count" v-if="i >= pagination.page - 1 && i < pagination.page + 9" :class="{active: pagination.page == i + 1}" @click=change(i+1)><a href=javascript:void(0)>{{ i + 1 }}</a></li> <li :class="{disabled: pagination.page >= pagination.count}" @click=forword10> <a href=javascript:void(0) aria-label=Next> <span aria-hidden=true>&raquo;</span> </a> </li> </ul> </nav>'},270:function(t,a,e){var o,i;o=e(271),i=e(272),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports["default"]),i&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=i)},271:function(t,a,e){(function(t,o){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(a,"__esModule",{value:!0});var n=e(64),r=i(n),s=e(61),d=i(s),p=e(254),c=i(p),l=t.extend({name:"orderList",components:{pagination:c["default"]},data:function(){return{orderList:[],loading:{fetch:!1,fetchGood:!1},params:{page:1,pageSize:10,count:0}}},ready:function(){this.fetch(!0)},methods:{change:function(t){this.params.page=t,this.fetch()},fetch:function(t){var a=this;t&&(a.params={page:1,pageSize:10,count:0}),a.loading.fetch||(a.loading.fetch=!a.loading.fetch,o.ajax({url:r["default"].orderList,data:a.params,success:function(t){a.orderList=t.content,a.params.count=Math.ceil(t.count/a.params.pageSize)},error:function(t){a.alert({show:!0,msg:"拉取订单列表失败",type:"error"})}}).always(function(){a.loading.fetch=!a.loading.fetch}))},expand:function(a){var e=this;e.loading.fetchGood||(e.loading.fetchGood=!e.loading.fetchGood,o.ajax({url:r["default"].orderDetail,data:{order_id:a.id},success:function(e){t.set(a,"goodList",e)},error:function(t){e.alert({show:!0,msg:"获取订单商品失败",type:"error"})}}).always(function(){e.loading.fetchGood=!e.loading.fetchGood}))}},vuex:{actions:{alert:d["default"].alert}}});a["default"]=l}).call(a,e(10),e(9))},272:function(t,a){t.exports='<div class="panel panel-primary good-list"> <div class=panel-heading>订单列表</div> <table class=table v-if="!loading.fetch && orderList.length > 0"> <thead> <tr> <th>订单号</th> <th>快递单号</th> <th>快递费用</th> <th>收件人</th> <th>价格</th> <th>操作</th> <th>发货时间</th> </tr> </thead> <tbody> <template v-for="order in orderList"> <tr class=item> <td> {{order.id}} </td> <td>{{order.expressId}}</td> <td> {{order.expressCost}} </td> <td> {{order.name}} </td> <td> {{order.price}} </td> <td><a href=javascript:void(0) @click=expand(order) v-if=!order.goodList>展开</a> <div v-if="order.goodList && order.goodList.length > 0" v-for="good in order.goodList"> <span>{{ good.name }}</span> <span>({{ good.goods_attr | remove-whitespace }})</span> <span>*{{ good.amount }}</span> </div> </td> <td> {{order.date}} </td> </tr> <tr v-if=order.comment> <td colspan=7>{{order.comment}}</td> </tr> </template> </tbody> </table> <pagination :pagination=params :change=change></pagination> <div class=empty v-if="!loading.fetch && orderList.length == 0"> <div class=msg>商品列表为空</div> </div> <div v-if=loading.fetch> <div class="loading audio-wave"></div> </div> </div>'}});
//# sourceMappingURL=14.ba2fefaa5b314e9287cb.js.map