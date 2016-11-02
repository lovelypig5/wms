webpackJsonp([9],{282:function(t,a,i){var e,o,n={};e=i(283),o=i(284),t.exports=e||{},t.exports.__esModule&&(t.exports=t.exports["default"]);var s="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;o&&(s.template=o),s.computed||(s.computed={}),Object.keys(n).forEach(function(t){var a=n[t];s.computed[t]=function(){return a}})},283:function(t,a,i){(function(t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=t.extend({props:["pagination","change"],computed:{lower:function e(){var e=this.pagination.page-5,t=this.pagination.page+5;return t>this.pagination.count&&(e=this.pagination.count-10),e<0&&(e=0),e},upper:function o(){var t=this.pagination.page-5,o=this.pagination.page+5;return t<0&&(o=10),o>this.pagination.count&&(o=this.pagination.count),o}},methods:{back10:function(){if(!(this.pagination.page<=1)){var t=this.pagination.page-10<1?1:this.pagination.page-10;this.change(t)}},forword10:function(){if(!(this.pagination.page>=this.pagination.count)){var t=this.pagination.page+10>this.pagination.count?this.pagination.count:this.pagination.page+10;this.change(t)}}}});a["default"]=i}).call(a,i(11))},284:function(t,a){t.exports=' <nav class=center> <ul class=pagination v-show="pagination.count > 1"> <li :class="{disabled: pagination.page <= 1}" @click=back10> <a href=javascript:void(0) aria-label=Previous> <span aria-hidden=true>&laquo;</span> </a> </li> <li v-for="i in pagination.count" v-if="i >= this.lower && i < this.upper" :class="{active: pagination.page == i + 1}" @click=change(i+1)><a href=javascript:void(0)>{{ i + 1 }}</a></li> <li :class="{disabled: pagination.page >= pagination.count}" @click=forword10> <a href=javascript:void(0) aria-label=Next> <span aria-hidden=true>&raquo;</span> </a> </li> </ul> </nav> '},285:function(t,a,i){var e,o,n={};e=i(286),t.exports=e||{},t.exports.__esModule&&(t.exports=t.exports["default"]);var s="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;o&&(s.template=o),s.computed||(s.computed={}),Object.keys(n).forEach(function(t){var a=n[t];s.computed[t]=function(){return a}})},286:function(t,a,i){(function(t,e){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(a,"__esModule",{value:!0});var n=i(267),s=o(n),r=i(287),d=o(r),c=i(66),p=o(c),l=i(63),u=o(l),f=i(282),h=o(f),g=t.extend({template:d["default"],name:"outList",components:{pagination:h["default"]},data:function(){return{outList:[],loading:{fetch:!1},params:{page:1,pageSize:10,count:0,type:1}}},ready:function(){this.fetch(!0)},methods:{change:function(t){this.params.page=t,this.fetch()},edit:function(a){t.set(a,"edit",!a.edit)},save:function(a){var i=this;a.type=1,e.ajax({url:p["default"].modifyInOut,type:"post",data:(0,s["default"])(a),success:function(t){},error:function(t){i.alert({show:!0,msg:t||"修改出库记录失败",type:"error"})}}).always(function(){t.set(a,"edit",!a.edit)})},fetch:function(t){var a=this;t&&(a.params={page:1,pageSize:10,count:0,type:1}),a.loading.fetch||(a.loading.fetch=!a.loading.fetch,e.ajax({url:p["default"].outList,data:a.params}).done(function(t){a.outList=t.content,a.params.count=Math.ceil(t.count/a.params.pageSize)}).fail(function(t){a.alert({show:!0,msg:"拉取出库记录失败",type:"error"})}).always(function(){a.loading.fetch=!a.loading.fetch}))}},vuex:{actions:{alert:u["default"].alert}}});a["default"]=g}).call(a,i(11),i(10))},287:function(t,a){t.exports='<div> <div class=row> <div class=col-lg-12> <h1 class=page-header>{{ $t(\'text_goods_outlist\') }}</h1> </div> </div> <div class=row> <div class=col-lg-12> <div class="panel panel-primary good-list"> <div class=panel-heading> <i class="fa fa-bar-chart-o fa-fw"></i> {{ $t(\'text_goods_outlist\') }} </div> <div class=panel-body> <div class=row> <div class=col-lg-12> <div class=table-responsive> <table class=table v-if="!loading.fetch && outList.length > 0"> <thead> <tr> <th>商品名称</th> <th>商品属性</th> <th>出库数量</th> <th>出库价格</th> <th>出库时间</th> <th>操作</th> </tr> </thead> <tbody> <tr class=item v-for="record in outList"> <td><a href=javascript:void(0) v-link="{name: \'detail\', params: {id: record.good_id} }">{{record.good.name}}</a></td> <td>{{record.attrs | join-attrs}}</td> <td v-if=!record.edit> {{record.amount}} </td> <td v-if=record.edit> <input type=text v-model=record.amount> </td> <td v-if=!record.edit>{{record.price}} </td> <td v-if=record.edit> <input type=text v-model=record.price> </td> <td>{{record.date}}</td> <td><i class="fa fa-pencil-square-o" aria-hidden=true @click=edit(record) v-if=!record.edit></i> <i class="fa fa-floppy-o" aria-hidden=true v-if=record.edit @click=save(record)></i> </td> </tr> </tbody> </table> <pagination :pagination=params :change=change></pagination> <div class=empty v-if="!loading.fetch && outList.length == 0"> <div class=msg>没有出库记录</div> </div> <div v-if=loading.fetch> <div class="loading audio-wave"></div> </div> </div> </div> </div> </div> </div> </div> </div> </div> '}});
//# sourceMappingURL=9.a1324caab2c2949513ae.js.map