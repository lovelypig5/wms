webpackJsonp([0,17],{"/1rO":function(e,t){e.exports='<header> <nav class="navbar navbar-default navbar-static-top" role=navigation style=margin-bottom:0> <div class=navbar-header> <button type=button class=navbar-toggle data-toggle=collapse data-target=.navbar-collapse> <span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span> </button> <a class=navbar-brand href=index.html>{{$t(\'brand\')}}</a> </div> <ul class="nav navbar-top-links navbar-right"> <li class=dropdown> <a href=javascript:void(0) @click=login v-if=!user.id>{{$t(\'action_login\')}}</a> <a class=dropdown-toggle data-toggle=dropdown href=# v-if=user.id> <i class="fa fa-user fa-fw"></i> {{user.name}} <i class="fa fa-caret-down"></i> </a> <ul class="dropdown-menu dropdown-user" v-if=user.id> <li v-if=user.id v-link="{path: \'/goods\', activeClass: \'active\'}"><a href=#><i class="fa fa-gear fa-fw"></i>{{$t(\'text_goods_list\')}} </a> </li> <li><a href=javascript:void(0) @click="changeLocale(\'en\')"><i class="fa fa-language fa-fw"></i> {{$t(\'text_language\')}}</a></li> <li class=divider></li> <li><a href=javascript:void(0) @click=logout><i class="fa fa-sign-out fa-fw"></i> {{$t(\'action_logout\')}}</a> </li> </ul> </li> </ul> <left-menu v-if="user.id && $route.path != \'/\' && $route.path != \'/home\'"></left-menu> </nav> </header> '},"0KIj":function(e,t,a){var o,n,s={};o=a("LNkp"),e.exports=o||{},e.exports.__esModule&&(e.exports=e.exports.default);var i="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;n&&(i.template=n),i.computed||(i.computed={}),Object.keys(s).forEach(function(e){var t=s[e];i.computed[e]=function(){return t}})},"1PaZ":function(e,t,a){"use strict";(function(e){function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a("HnTy"),s=o(n),i=e.extend({template:s.default,name:"leftmenu",data:function(){return{navs:[{name:e.t("home"),path:"/home",className:"fa-dashboard",children:[]},{name:e.t("goods"),path:"/goods",className:"fa-bar-chart-o",children:[{name:e.t("text_goods_list"),path:"/goods/list",className:"",children:[]},{name:e.t("text_goods_out"),path:"/goods/out",className:"",children:[]},{name:e.t("text_goods_in"),path:"/goods/in",className:"",children:[]},{name:e.t("text_goods_outlist"),path:"/goods/outList",className:"",children:[]},{name:e.t("text_goods_inlist"),path:"/goods/inList",className:"",children:[]},{name:e.t("text_goods_create"),path:"/goods/create",className:"",children:[]}]},{name:e.t("order"),path:"/order/list",className:"fa-table",children:[{name:e.t("text_order_list"),path:"/order/list",className:"",children:[]},{name:e.t("text_order_create"),path:"/order/create",className:"",children:[]}]}]}}});t.default=i}).call(t,a("I3G/"))},AFvk:function(e,t){e.exports='<app-header></app-header> <div class="container home"> <div class=jumbotron> <h2>版本1.0.0正式发布 <span class="label label-success">New</span></h2> <div class=page-header> <h4>版本说明：</h4> </div> <div class="panel panel-default"> <div class=panel-heading>商品管理功能</div> <div class=panel-body> <ul> <li>新商品：每个商品暂时只包含商品名称和商品属性</li> <li>商品属性的自由创建和添加：从设计上来说，商品属性是属于商品的一部分特征，它可以被自由的增加到商品上，没有明确的类别设置</li> <li>自由化的商品入库：自定义的组合属性入库商品，并且组合属性会单独记录库存</li> <li>出库：类似入库的方式</li> <li>出入库记录：组合属性级别的出入库记录</li> </ul> </div> </div> <div class="panel panel-default"> <div class=panel-heading>未来版本功能预测</div> <div class=panel-body> <ul> <li>商品数据统计：商品库存，今日数据</li> <li>库存趋势：用于分析商品未来库存走势，已经库存告罄的大概时间节点</li> <li>利润趋势：用于分析商品出售产生的总体利润</li> </ul> </div> </div> </div> </div> <app-footer></app-footer> '},Cmso:function(e,t,a){var o,n,s={};o=a("1PaZ"),e.exports=o||{},e.exports.__esModule&&(e.exports=e.exports.default);var i="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;n&&(i.template=n),i.computed||(i.computed={}),Object.keys(s).forEach(function(e){var t=s[e];i.computed[e]=function(){return t}})},HnTy:function(e,t){e.exports='<div class="navbar-default sidebar" role=navigation> <div class="sidebar-nav navbar-collapse"> <ul class=nav id=side-menu> <li v-for="nav in navs"> <a href=javascript:void(0) v-link="{path: nav.path, activeClass: \'active\'}"><i class="fa {{ nav.className }} fa-fw"></i> {{ nav.name }}<span class="fa arrow" v-if="nav.children && nav.children.length > 0"></span></a> <ul class="nav nav-second-level" v-if="nav.children && nav.children.length > 0"> <li v-for="nav_second in nav.children"> <a href=javascript:void(0) v-link="{path: nav_second.path, activeClass: \'active\'}"><i class="fa {{ nav_second.className }} fa-fw"></i> {{ nav_second.name }}</a> </li> </ul> </li> </ul> </div> </div> '},IFkO:function(e,t,a){var o,n,s={};o=a("MkNM"),e.exports=o||{},e.exports.__esModule&&(e.exports=e.exports.default);var i="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;n&&(i.template=n),i.computed||(i.computed={}),Object.keys(s).forEach(function(e){var t=s[e];i.computed[e]=function(){return t}})},LNkp:function(e,t,a){"use strict";(function(e){function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a("/1rO"),s=o(n),i=a("Cmso"),l=o(i),r=a("UY0x"),c=o(r),d=e.extend({template:s.default,name:"header",ready:function(){this.getUser()},components:{leftMenu:l.default},vuex:{getters:{lang:function(e){return e.lang},user:function(e){return e.user}},actions:{changeLocale:c.default.changeLocale,login:function(e){this.$route.router.go({path:"/login"})},logout:c.default.logout,getUser:c.default.user}}});t.default=d}).call(t,a("I3G/"))},MkNM:function(e,t,a){"use strict";(function(e){function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a("AFvk"),s=o(n),i=a("0KIj"),l=o(i),r=a("VWXB"),c=o(r),d=a("U65f"),u=o(d),p=e.extend({template:s.default,name:"home",components:{appHeader:l.default,appFooter:c.default},data:function(){return{menu:u.default.goodsMenu,path:["/analysis","/list","/out","/in","/outList","/inList","/create"]}},methods:{change:function(e){this.selectIdx=e}}});t.default=p}).call(t,a("I3G/"))},U65f:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={goodsMenu:["text_goods_state","text_goods_list","text_goods_out","text_goods_in","text_goods_outlist","text_goods_inlist","text_goods_create"],orderMenu:["text_order_list","text_order_create"],select2:{zh:{errorLoading:function(){return"无法载入结果。"},inputTooLong:function(e){return"请删除"+(e.input.length-e.maximum)+"个字符"},inputTooShort:function(e){return"请再输入至少"+(e.minimum-e.input.length)+"个字符"},loadingMore:function(){return"载入更多结果…"},maximumSelected:function(e){return"最多只能选择"+e.maximum+"个项目"},noResults:function(){return"未找到结果"},searching:function(){return"搜索中…"}}}};t.default=o},VWXB:function(e,t,a){var o,n,s={};o=a("kuKU"),n=a("hWwF"),e.exports=o||{},e.exports.__esModule&&(e.exports=e.exports.default);var i="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;n&&(i.template=n),i.computed||(i.computed={}),Object.keys(s).forEach(function(e){var t=s[e];i.computed[e]=function(){return t}})},hWwF:function(e,t){e.exports=' <footer> <div class="container center"> &copy;2015 Team, Out2let. 沪ICP备14032618号 </div> </footer> '},kuKU:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var a=e.extend({components:{}});t.default=a}).call(t,a("I3G/"))}});
//# sourceMappingURL=0.292d0ad3c4cb28763b00.js.map