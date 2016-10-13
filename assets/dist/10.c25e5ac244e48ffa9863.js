webpackJsonp([10],{276:function(t,a,i){var o,e,n={};o=i(277),e=i(278),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports["default"]);var s="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;e&&(s.template=e),s.computed||(s.computed={}),Object.keys(n).forEach(function(t){var a=n[t];s.computed[t]=function(){return a}})},277:function(t,a,i){(function(t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=t.extend({props:["pagination","change"],computed:{lower:function o(){var o=this.pagination.page-5,t=this.pagination.page+5;return t>this.pagination.count&&(o=this.pagination.count-10),o<0&&(o=0),o},upper:function e(){var t=this.pagination.page-5,e=this.pagination.page+5;return t<0&&(e=10),e>this.pagination.count&&(e=this.pagination.count),e}},methods:{back10:function(){if(!(this.pagination.page<=1)){var t=this.pagination.page-10<1?1:this.pagination.page-10;this.change(t)}},forword10:function(){if(!(this.pagination.page>=this.pagination.count)){var t=this.pagination.page+10>this.pagination.count?this.pagination.count:this.pagination.page+10;this.change(t)}}}});a["default"]=i}).call(a,i(10))},278:function(t,a){t.exports=' <nav class=center> <ul class=pagination v-show="pagination.count > 1"> <li :class="{disabled: pagination.page <= 1}" @click=back10> <a href=javascript:void(0) aria-label=Previous> <span aria-hidden=true>&laquo;</span> </a> </li> <li v-for="i in pagination.count" v-if="i >= this.lower && i < this.upper" :class="{active: pagination.page == i + 1}" @click=change(i+1)><a href=javascript:void(0)>{{ i + 1 }}</a></li> <li :class="{disabled: pagination.page >= pagination.count}" @click=forword10> <a href=javascript:void(0) aria-label=Next> <span aria-hidden=true>&raquo;</span> </a> </li> </ul> </nav> '},280:function(t,a,i){var o,e,n={};o=i(281),e=i(282),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports["default"]);var s="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;e&&(s.template=e),s.computed||(s.computed={}),Object.keys(n).forEach(function(t){var a=n[t];s.computed[t]=function(){return a}})},281:function(t,a,i){(function(t,o){"use strict";function e(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(a,"__esModule",{value:!0});var n=i(262),s=e(n),d=i(64),p=e(d),c=i(61),r=e(c),u=i(276),l=e(u),g=t.extend({name:"outList",components:{pagination:l["default"]},data:function(){return{outList:[],loading:{fetch:!1},params:{page:1,pageSize:10,count:0,type:1}}},ready:function(){this.fetch(!0)},methods:{change:function(t){this.params.page=t,this.fetch()},edit:function(a){t.set(a,"edit",!a.edit)},save:function(a){var i=this;a.type=1,o.ajax({url:p["default"].modifyInOut,type:"post",data:(0,s["default"])(a),success:function(t){},error:function(t){i.alert({show:!0,msg:t||"修改出库记录失败",type:"error"})}}).always(function(){t.set(a,"edit",!a.edit)})},fetch:function(t){var a=this;t&&(a.params={page:1,pageSize:10,count:0,type:1}),a.loading.fetch||(a.loading.fetch=!a.loading.fetch,o.ajax({url:p["default"].outList,data:a.params,success:function(t){a.outList=t.content,a.params.count=Math.ceil(t.count/a.params.pageSize)},error:function(t){a.alert({show:!0,msg:"拉取出库记录失败",type:"error"})}}).always(function(){a.loading.fetch=!a.loading.fetch}))}},vuex:{actions:{alert:r["default"].alert}}});a["default"]=g}).call(a,i(10),i(9))},282:function(t,a){t.exports=' <div class="panel panel-primary good-list"> <div class=panel-heading>出库记录</div> <table class=table v-if="!loading.fetch && outList.length > 0"> <thead> <tr> <th>商品名称</th> <th>商品属性</th> <th>出库数量</th> <th>出库价格</th> <th>出库时间</th> <th>操作</th> </tr> </thead> <tbody> <tr class=item v-for="good in outList"> <td><a href=javascript:void(0) v-link="{name: \'detail\', params: {id: good.goods_id} }">{{good.name}}</a></td> <td>{{good.goods_attr | remove-whitespace}}</td> <td v-if=!good.edit> {{good.amount}} </td> <td v-if=good.edit> <input type=text v-model=good.amount> </td> <td v-if=!good.edit>{{good.price}} </td> <td v-if=good.edit> <input type=text v-model=good.price> </td> <td>{{good.date}}</td> <td><i class="fa fa-pencil-square-o" aria-hidden=true @click=edit(good) v-if=!good.edit></i> <i class="fa fa-floppy-o" aria-hidden=true v-if=good.edit @click=save(good)></i> </td> </tr> </tbody> </table> <pagination :pagination=params :change=change></pagination> <div class=empty v-if="!loading.fetch && outList.length == 0"> <div class=msg>没有出库记录</div> </div> <div v-if=loading.fetch> <div class="loading audio-wave"></div> </div> </div> '}});
//# sourceMappingURL=10.c25e5ac244e48ffa9863.js.map