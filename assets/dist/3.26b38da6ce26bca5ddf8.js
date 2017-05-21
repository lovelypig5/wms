webpackJsonp([3],{"/dMI":function(a,t){a.exports='<nav class=center> <ul class=pagination v-show="totalPage > 1"> <li @click=change(1)> <a href=javascript:void(0) aria-label=Previous> <span aria-hidden=true>&laquo;</span> </a> </li> <li :class="{disabled: pagination.page <= 1}" v-if="pagination.page > 1" @click="change(pagination.page - 1)"> <a href=javascript:void(0) aria-label=Previous> <span aria-hidden=true>&lsaquo;</span> </a> </li> <li v-if="pagination.page > 1" @click=back> <a href=javascript:void(0) aria-label=Previous> <span aria-hidden=true>...</span> </a> </li> <li v-for="i in totalPage" v-if="i >= this.lower && i < this.upper" :class="{active: pagination.page == i + 1}" @click="change(i + 1)"><a href=javascript:void(0)>{{ i + 1 }}</a></li> <li v-if="pagination.page < totalPage" @click=forword> <a href=javascript:void(0) aria-label=Previous> <span aria-hidden=true>...</span> </a> </li> <li v-if="pagination.page < totalPage" @click="change(pagination.page + 1)"> <a href=javascript:void(0) aria-label=Previous> <span aria-hidden=true>&rsaquo;</span> </a> </li> <li :class="{disabled: pagination.page >= totalPage}" @click=change(totalPage)> <a href=javascript:void(0) aria-label=Previous> <span aria-hidden=true>&raquo;</span> </a> </li> <li><span>{{ pagination.page }}/{{ totalPage }} 页</span></li> </ul> </nav> '},AGbM:function(a,t,e){"use strict";(function(a,i){Object.defineProperty(t,"__esModule",{value:!0});var n=e("caQ2"),o=e.n(n),r=e("k06x"),s=e("UY0x"),d=e("Cakq"),c=e.n(d),p=e("uDSD"),l=e.n(p),g=a.extend({template:o.a,name:"syncOrder",components:{pagination:c.a},data:function(){return{synclist:[],loading:{fetch:!1,save:!1},params:{page:1,pageSize:10,count:0},ETL:l.a,show:!1}},ready:function(){this.fetch(!0)},methods:{change:function(a){this.params.page=a,this.fetch()},fetch:function(a){var t=this;a&&(t.params={page:1,pageSize:10,count:0}),t.loading.fetch||(t.loading.fetch=!t.loading.fetch,i.ajax({url:r.a.orderSyncList,data:t.params,success:function(a){t.synclist=a.map(function(a){var t=JSON.parse(a.value);return t.edit=!1,t.flag=a.flag,t}),t.params.count=a.count},error:function(a){t.alert({show:!0,msg:"拉取订单列表失败",type:"error"})}}).always(function(){t.loading.fetch=!t.loading.fetch}))},showScript:function(){this.show=!this.show},sync:function(a){var t=this;if(!t.loading.save){if(!a.expressId)return void t.alert({show:!0,msg:"快递单号不能为空",type:"error"});t.loading.save=!t.loading.save,i.ajax({url:r.a.syncOrder,type:"post",data:JSON.stringify({orderId:a.orderId,receiveName:a.name,expressId:a.expressId,expressCost:a.expressPrice,goodList:a.goods,price:a.price,comment:a.comment}),success:function(e){t.alert({show:!0,msg:"同步成功",type:"success"}),a.flag=1},error:function(a){t.alert({show:!0,msg:a.responseText||"同步失败",type:"error"})}}).always(function(){t.loading.save=!t.loading.save})}}},vuex:{actions:{alert:s.a.alert}}});t.default=g}).call(t,e("I3G/"),e("7t+N"))},Cakq:function(a,t,e){var i,n={};i=e("zWAh"),a.exports=i||{},a.exports.__esModule&&(a.exports=a.exports.default);var o="function"==typeof a.exports?a.exports.options||(a.exports.options={}):a.exports;o.computed||(o.computed={}),Object.keys(n).forEach(function(a){var t=n[a];o.computed[a]=function(){return t}})},aOvi:function(a,t,e){var i,n={};i=e("AGbM"),a.exports=i||{},a.exports.__esModule&&(a.exports=a.exports.default);var o="function"==typeof a.exports?a.exports.options||(a.exports.options={}):a.exports;o.computed||(o.computed={}),Object.keys(n).forEach(function(a){var t=n[a];o.computed[a]=function(){return t}})},caQ2:function(a,t){a.exports='<div class=sync-order> <div class=row> <div class=col-lg-12> <h1 class=page-header>{{ $t(\'text_order_sync\') }}</h1> </div> </div> <div class=row> <div class=col-lg-12> <div class="panel panel-primary good-list"> <div class=panel-heading> <i class="fa fa-bar-chart-o fa-fw"></i> {{ $t(\'text_order_sync\') }} </div> <div class=panel-body> <div class="row btns"> <button type=button class="btn btn-primary float-right" @click=syncAll>同步所有</button> <button type=button class="btn btn-primary float-right" @click=showScript>同步脚本</button> </div> <div class="row script" v-if=show> javascript:{{ ETL }} </div> <div class="row script" v-if=show> 请保存书签： 将以上内容复制到网址栏中。 </div> <div class=row> <div class=col-lg-12> <div class=table-responsive> <table class="table table-bordered table-hover table-striped" v-if="!loading.fetch && synclist.length > 0"> <thead> <tr> <th>订单号</th> <th>快递单号</th> <th>收件人</th> <th>价格</th> <th>详细商品</th> <th>发货时间</th> <th>备注</th> <th>状态</th> <th>操作</th> </tr> </thead> <tbody> <tr class=item v-for="order in synclist"> <td> {{order.orderId}} </td> <td v-if=!order.edit> {{order.expressId}} </td> <td v-if=order.edit> <input type=text v-model=order.expressId> </td> <td> {{order.name}} </td> <td> {{order.price}} </td> <td> <div v-for="good in order.goods"> <span>{{ good.name }}</span> <span>({{ good.attrs | join-attrs }})</span> <span> * {{ good.amount }}</span> </div> </td> <td> {{order.date}} </td> <td v-if=!order.edit> {{order.comment}} </td> <td v-if=order.edit> <textarea type=text v-model=order.comment></textarea> </td> <td>{{[\'未同步\',\'已同步\'][order.flag]}}</td> <td> <i class="fa fa-pencil-square-o" aria-hidden=true @click="order.edit = true" v-if=!order.edit></i> <i class="fa fa-floppy-o" aria-hidden=true v-if=order.edit @click="order.edit = false"></i> <i class="fa fa-refresh" aria-hidden=true @click="sync(order, $index)" v-if=!order.flag></i> </td> </tr> </tbody> </table> <div class=empty v-if="!loading.fetch && synclist.length == 0"> <div class=msg>商品列表为空</div> </div> <div v-if=loading.fetch> <div class="loading audio-wave"></div> </div> <pagination :pagination=params :change=change></pagination> </div> </div> </div> </div> </div> </div> </div> </div> '},uDSD:function(a,t){a.exports="( function () {\n    var DICT = {\n        '80ml美国外贸药瓶医用密封PP透明塑料瓶便携分装收纳药盒拇指瓶': '拇指瓶',\n        '美国美剧安全塑料药瓶防儿童误食pp药盒旅行收纳分装瓶正反两用瓶': '两用瓶',\n        '50ml特价创意医用密封透明pet螺旋塑料瓶定制分装瓶保健瓶小药瓶': '螺旋瓶',\n        '60ml美国创意医用密封透明定制分装pp塑料瓶旅行收纳小药瓶安全瓶': '安全瓶'\n    };\n    var content = document.getElementById( 'sold_container' ).firstChild.children[ 5 ].innerText;\n\n    var form = document.createElement( \"form\" );\n    document.body.appendChild( form );\n    form.method = 'post';\n    form.action = 'http://wms.out2man.com/api/order/sync';\n    form.target = '_blank';\n    var newElement = document.createElement( \"input\" );\n    newElement.setAttribute( \"name\", \"content\" );\n    newElement.setAttribute( \"type\", \"hidden\" );\n    newElement.setAttribute( \"value\", escape( content ) );\n    form.appendChild( newElement );\n    form.submit();\n} )()\n"},zWAh:function(a,t,e){"use strict";(function(a){Object.defineProperty(t,"__esModule",{value:!0});var i=e("/dMI"),n=e.n(i),o=a.extend({template:n.a,props:["pagination","change","pageNum"],created:function(){this.pageNum||(this.pageNum=10),this.pageNum=parseInt(this.pageNum)},computed:{pageNumHalf:function(){return Math.ceil(this.pageNum/2)},lower:function a(){var a=this.pagination.page-this.pageNumHalf;return this.pagination.page+this.pageNumHalf-1>this.totalPage&&(a=this.totalPage-this.pageNum),a<0&&(a=0),a},upper:function a(){var t=this.pagination.page-this.pageNumHalf,a=this.pagination.page+this.pageNumHalf-1;return t<0&&(a=this.pageNum),a>this.totalPage&&(a=this.totalPage),a},totalPage:function(){return Math.ceil(this.pagination.count/this.pagination.pageSize)}},methods:{back:function(){if(!(this.pagination.page<=1)){var a=this.pagination.page-this.pageNum<1?1:this.pagination.page-this.pageNum;this.change(a)}},forword:function(){if(!(this.pagination.page>=this.totalPage)){var a=this.pagination.page+this.pageNum>this.totalPage?this.totalPage:this.pagination.page+this.pageNum;this.change(a)}}}});t.default=o}).call(t,e("I3G/"))}});
//# sourceMappingURL=3.26b38da6ce26bca5ddf8.js.map