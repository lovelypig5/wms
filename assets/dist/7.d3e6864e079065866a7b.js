webpackJsonp([7],{68:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={goodsMenu:["text_goods_state","text_goods_list","text_goods_out","text_goods_in","text_goods_outlist","text_goods_inlist","text_goods_create"],orderMenu:["text_order_list","text_order_create"],select2:{zh:{errorLoading:function(){return"无法载入结果。"},inputTooLong:function(t){var e=t.input.length-t.maximum,i="请删除"+e+"个字符";return i},inputTooShort:function(t){var e=t.minimum-t.input.length,i="请再输入至少"+e+"个字符";return i},loadingMore:function(){return"载入更多结果…"},maximumSelected:function(t){var e="最多只能选择"+t.maximum+"个项目";return e},noResults:function(){return"未找到结果"},searching:function(){return"搜索中…"}}}};e["default"]=i},246:function(t,e,i){var o,n;o=i(247),n=i(248),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports["default"]),n&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=n)},247:function(t,e,i){(function(t,o){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var r=i(240),a=n(r),d=i(64),s=n(d),u=i(68),l=n(u),c=i(61),p=n(c);i(16);var v=t.extend({name:"in",data:function(){return{model:{id:"",name:"",attr:[],amount:0,priceIn:""},attrList:[],loading:{"in":!1}}},ready:function(){var t=this;o(this.$el).find("#productName").select2({placeholder:"请输入商品名称（必填）",language:l["default"].select2[this.lang],ajax:{url:s["default"].searchGood,data:function(t){return{name:t.term,page:t.page}},dataType:"json",delay:700,processResults:function(t,e){var i=[];return t.forEach(function(t){i.push({id:t.id,text:t.name})}),{results:i}}}}).on("select2:select",function(e){var i=e.params.data;i&&(t.model.id=i.id,t.model.name=i.text,t.fetchAttrs())}),o(this.$el).find("#productAttr").select2({multiple:!0,placeholder:"请选择商品属性",language:l["default"].select2[this.lang]}),this.$watch("model.id",this.changeSelect),this.init()},watch:{attrList:function(){o(this.$el).find("#productAttr").trigger("change")}},methods:{init:function(){var e=this,i=e.$route.query.id,n=e.$route.query.name;i&&n&&(e.model.id=i,e.model.name=decodeURIComponent(n),o(e.$el).find("#productName").append('<option value="'+e.model.id+'">'+e.model.name+"</option>"),e.fetchAttrs(function(){var i=e.$route.query.attr;i=decodeURIComponent(i).split(","),i&&t.nextTick(function(){e.model.attr=i,o("#productAttr").val(i).trigger("change")})}))},changeSelect:function(){o(this.$el).find("#productName").trigger("change")},fetchAttrs:function(t){var e=this;o.ajax({url:s["default"].goodsAttrs,data:{good_id:this.model.id},success:function(i){e.attrList=i,t&&"function"==typeof t&&t()},error:function(){e.attrList=[]}})},goodsIn:function(){var t=this;t.$validate(!0),t.$v.invalid||t.loading["in"]||(t.loading["in"]=!t.loading["in"],t.model.attr=o(t.$el).find("#productAttr").val(),o.ajax({url:s["default"].goodsIn,type:"post",data:(0,a["default"])(t.model),success:function(e){t.alert({show:!0,msg:"入库成功",type:"success"}),t.reset(!0)},error:function(e){t.alert({show:!0,msg:e.responseText||"入库失败",type:"error"})}}).always(function(){t.loading["in"]=!t.loading["in"]}))},reset:function(t){var e=t?this.model.id:"",i=t?this.model.name:"";this.model={id:e,name:i,attr:[],amount:0,priceIn:""},this.$resetValidation()}},vuex:{getters:{lang:function(t){return t.lang}},actions:{alert:p["default"].alert}}});e["default"]=v}).call(e,i(10),i(9))},248:function(t,e){t.exports='<div class="panel panel-primary good-in"> <div class=panel-heading>商品入库</div> <div class=panel-body> <validator name=v> <div class=input-group> <span class=input-group-addon>商品名称</span> <div class=select2Div> <select id=productName style="width: 100%" v-model=model.id v-validate:name={required:true}> </select> </div> </div> <div class="input-group error-msg" v-if="$v.name.touched && $v.name.invalid"> <div v-if=$v.name.required class=red-color>商品名称不能为空</div> </div> <div class=input-group> <span class=input-group-addon>商品属性</span> <div class=select2Div> <select id=productAttr style="width: 100%"> <option v-for="attr in attrList" :value=attr.attr>{{attr.attr}}</option> </select> </div> </div> <div class=input-group> <span class=input-group-addon>入库数量</span> <input id=productAmount type=text class=form-control placeholder=请输入入库数量 aria-describedby=productAmount v-model=model.amount v-validate:amount="{required:true, posInt: true}" :class="{\'red-border\': $v.amount && $v.amount.touched && $v.amount.invalid}" number> </div> <div class="input-group error-msg" v-if="$v.amount.touched && $v.amount.invalid"> <div v-if=$v.amount.required class=red-color>入库数量不能为空</div> <div v-if="!$v.amount.required && $v.amount.posInt" class=red-color>入库数量只能为正整数</div> </div> <div class=input-group> <span class=input-group-addon id=productAmount>商品进价</span> <input type=text class=form-control placeholder=请输入商品进价 aria-describedby=productPriceIn v-model=model.priceIn v-validate:price="{required:true, number: true}" :class="{\'red-border\': $v.price && $v.price.touched && $v.price.invalid}"> </div> <div class="input-group error-msg" v-if="$v.price.touched && $v.price.invalid"> <div v-if=$v.price.required class=red-color>商品进价不能为空</div> <div v-if="!$v.price.required && $v.price.number" class=red-color>商品进价只能为数字</div> </div> <div class="float-right btns"> <button type=button class="btn btn-primary" @click=goodsIn>入库</button> <button type=button class="btn btn-danger" @click=reset>取消</button> </div> </validator> </div> </div>'}});
//# sourceMappingURL=7.d3e6864e079065866a7b.js.map