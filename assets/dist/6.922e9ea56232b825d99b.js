webpackJsonp([6],{70:function(e,t,a){var o,r;o=a(71),r=a(78),e.exports=o||{},e.exports.__esModule&&(e.exports=e.exports["default"]),r&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=r)},71:function(e,t,a){(function(e,o){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(72),d=r(n),s=a(55),i=r(s),l=a(75),c=(r(l),a(52)),u=r(c),p=a(14),v=r(p),m=e.extend({name:"create",data:function(){return{model:{name:""},loading:{create:!1}}},ready:function(){this.taggle=new v["default"]("productAttr",{placeholder:"请输入商品属性（选填）（Enter键确认）"}),o("#productAttr").addClass("relative")},methods:{create:function(){var e=this;if(e.$validate(!0),!e.$v.invalid&&!e.loading.create){e.loading.create=!e.loading.create;var t=e.taggle.getTagValues();t.length>0&&(e.model.attr=t),o.ajax({url:i["default"].createGood,type:"post",data:(0,d["default"])(e.model),success:function(t){e.alert({show:!0,msg:"添加成功",type:"success"}),e.reset()},error:function(t){e.alert({show:!0,msg:t.responseText||"添加失败",type:"error"})}}).always(function(){e.loading.create=!e.loading.create})}},reset:function(){this.model={name:""},this.$resetValidation(),this.taggle.removeAll()}},vuex:{actions:{alert:u["default"].alert}}});t["default"]=m}).call(t,a(9),a(8))},78:function(e,t){e.exports='<div class="panel panel-primary good-create"> <div class=panel-heading>添加商品</div> <div class=panel-body> <validator name=v> <div class=input-group> <span class=input-group-addon id=productName>商品名称</span> <input type=text class=form-control placeholder=请输入商品名称 aria-describedby=productName v-model=model.name v-validate:name={required:true} :class="{\'red-border\': $v.name && $v.name.touched && $v.name.invalid}"> </div> <div class="input-group error-msg" v-if="$v.name.touched && $v.name.invalid"> <div v-if=$v.name.required class=red-color>商品名称不能为空</div> </div> <div class=input-group> <span class=input-group-addon>商品属性</span> <div id=productAttr class=productAttr></div> </div> <div class=input-group> <span class=input-group-addon id=productAmount>商品链接</span> <input type=text class=form-control placeholder=请输入商品链接（选填） aria-describedby=productAmount v-model=model.amount> </div> <div class="float-right btns"> <button type=button class="btn btn-primary" @click=create>添加</button> <button type=button class="btn btn-danger" @click=reset>取消</button> </div> </validator> </div> </div>'}});
//# sourceMappingURL=6.922e9ea56232b825d99b.js.map