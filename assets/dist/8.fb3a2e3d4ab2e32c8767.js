webpackJsonp([8],{70:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o={goodsMenu:["text_goods_state","text_goods_list","text_goods_out","text_goods_in","text_goods_outlist","text_goods_inlist","text_goods_create"],orderMenu:["text_order_list","text_order_create"],select2:{zh:{errorLoading:function(){return"无法载入结果。"},inputTooLong:function(t){var e=t.input.length-t.maximum,o="请删除"+e+"个字符";return o},inputTooShort:function(t){var e=t.minimum-t.input.length,o="请再输入至少"+e+"个字符";return o},loadingMore:function(){return"载入更多结果…"},maximumSelected:function(t){var e="最多只能选择"+t.maximum+"个项目";return e},noResults:function(){return"未找到结果"},searching:function(){return"搜索中…"}}}};e["default"]=o},282:function(t,e,o){var i,a,r={};i=o(283),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports["default"]);var n="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;a&&(n.template=a),n.computed||(n.computed={}),Object.keys(r).forEach(function(t){var e=r[t];n.computed[t]=function(){return e}})},283:function(t,e,o){(function(t,i){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var r=o(273),n=a(r),d=o(284),s=a(d),u=o(66),l=a(u),c=o(70),v=a(c),p=o(63),m=a(p);o(17);var f=t.extend({template:s["default"],name:"out",data:function(){return{model:{id:"",name:"",attr:"",amount:0,priceOut:""},attrList:[],loading:{fetch:!1,fetchList:!1,out:!1}}},ready:function(){var t=this;i(this.$el).find("#productName").select2({placeholder:"请输入商品名称（必填）",language:v["default"].select2[this.lang],ajax:{url:l["default"].searchGood,data:function(t){return{name:t.term,page:t.page}},dataType:"json",delay:700,processResults:function(t,e){var o=[];return t.forEach(function(t){o.push({id:t.id,text:t.name})}),{results:o}}}}).on("select2:select",function(e){var o=e.params.data;o&&(t.model.id=o.id,t.model.name=o.text,t.fetchCombination())}),i(this.$el).find("#productAttr").select2({placeholder:"请选择商品属性",language:v["default"].select2[this.lang]}),this.$watch("model.id",this.changeSelect),this.init()},watch:{attrList:function(){i(this.$el).find("#productAttr").trigger("change")}},methods:{fetchCombination:function(){var t=this;i.ajax({url:l["default"].attrCombination,data:{good_id:this.model.id},success:function(e){t.attrList=e},error:function(){t.attrList=[]}})},init:function(){var t=this.$route.query.id,e=this.$route.query.name;t&&e&&(this.model.id=t,this.model.name=decodeURIComponent(e),i(this.$el).find("#productName").append('<option value="'+this.model.id+'">'+this.model.name+"</option>"),this.fetchCombination());var o=this.$route.query.attr;o&&(this.model.attr=decodeURIComponent(o))},changeSelect:function(){i(this.$el).find("#productName").trigger("change")},goodsOut:function(){var t=this;t.$validate(!0),t.$v.invalid||t.loading.out||(t.loading.out=!t.loading.out,t.model.attr=i(t.$el).find("#productAttr").val(),i.ajax({url:l["default"].goodsOut,type:"post",data:(0,n["default"])(t.model),success:function(e){t.alert({show:!0,msg:"出库成功",type:"success"}),t.reset(!0)},error:function(e){t.alert({show:!0,msg:e.responseText||"出库失败",type:"error"})}}).always(function(){t.loading.out=!t.loading.out}))},reset:function(t){var e=t?this.model.id:"",o=t?this.model.name:"";this.model={id:e,name:o,attr:"",amount:0,priceOut:""},this.$resetValidation()}},vuex:{getters:{lang:function(t){return t.lang}},actions:{alert:m["default"].alert}}});e["default"]=f}).call(e,o(11),o(10))},284:function(t,e){t.exports='<div> <div class=row> <div class=col-lg-12> <h1 class=page-header>{{ $t(\'text_goods_out\') }}</h1> </div> </div> <div class=row> <div class=col-lg-12> <div class="panel panel-primary good-in"> <div class=panel-heading> <i class="fa fa-bar-chart-o fa-fw"></i> {{ $t(\'text_goods_out\') }} </div> <div class=panel-body> <validator name=v> <div class=input-group> <span class=input-group-addon>商品名称</span> <div class=select2Div> <select id=productName style=width:100% v-model=model.id v-validate:name={required:true}> </select> </div> </div> <div class="input-group error-msg" v-if="$v.name.touched && $v.name.invalid"> <div v-if=$v.name.required class=red-color>商品名称不能为空</div> </div> <div class=input-group> <span class=input-group-addon>商品属性</span> <div class=select2Div> <select id=productAttr style=width:100% v-model=model.attr> <option v-for="attr in attrList" :value="attr.attrs | join-attrs \'id\' \',\'">{{attr.attrs | join-attrs}}</option> </select> </div> </div> <div class=input-group> <span class=input-group-addon>出库数量</span> <input id=productAmount type=text class=form-control placeholder=请输入出库数量 aria-describedby=productAmount v-model=model.amount v-validate:amount="{required:true, posInt: true}" :class="{\'red-border\': $v.amount && $v.amount.touched && $v.amount.invalid}" number> </div> <div class="input-group error-msg" v-if="$v.amount.touched && $v.amount.invalid"> <div v-if=$v.amount.required class=red-color>出库数量不能为空</div> <div v-if="!$v.amount.required && $v.amount.posInt" class=red-color>出库数量只能为正整数</div> </div> <div class=input-group> <span class=input-group-addon id=productAmount>出售总价</span> <input type=text class=form-control placeholder=请输入商品总价 aria-describedby=productPriceIn v-model=model.priceOut v-validate:price="{required:true, number: true}" :class="{\'red-border\': $v.price && $v.price.touched && $v.price.invalid}"> </div> <div class="input-group error-msg" v-if="$v.price.touched && $v.price.invalid"> <div v-if=$v.price.required class=red-color>出售总价不能为空</div> <div v-if="!$v.price.required && $v.price.number" class=red-color>出售总价只能为数字</div> </div> <div class="float-right btns"> <button type=button class="btn btn-primary" @click=goodsOut>出库</button> <button type=button class="btn btn-danger" @click=reset>取消</button> </div> </validator> </div> </div> </div> </div> </div> '}});
//# sourceMappingURL=8.fb3a2e3d4ab2e32c8767.js.map