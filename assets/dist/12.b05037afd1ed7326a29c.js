webpackJsonp([12],{264:function(module,exports,__webpack_require__){eval('var __vue_script__, __vue_template__\n__vue_script__ = __webpack_require__(265)\n__vue_template__ = __webpack_require__(266)\nmodule.exports = __vue_script__ || {}\nif (module.exports.__esModule) module.exports = module.exports.default\nif (__vue_template__) {\n(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__\n}\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./js/features/goods/goodAttr.vue\n ** module id = 264\n ** module chunks = 12\n **/\n//# sourceURL=webpack:///./js/features/goods/goodAttr.vue?')},265:function(module,exports,__webpack_require__){eval('/* WEBPACK VAR INJECTION */(function(Vue, $) {\'use strict\';\n\nObject.defineProperty(exports, "__esModule", {\n    value: true\n});\n\nvar _api = __webpack_require__(64);\n\nvar _api2 = _interopRequireDefault(_api);\n\nvar _actions = __webpack_require__(61);\n\nvar _actions2 = _interopRequireDefault(_actions);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// <template>\n//     <div class="panel panel-primary good-attr">\n//         <div class="panel-heading">{{good.name}}</div>\n//         <table class="table" v-if="!loading.fetch">\n//             <thead>\n//                 <tr>\n//                     <th>属性列表</th>\n//                     <th>操作</th>\n//                 </tr>\n//             </thead>\n//             <tbody>\n//                 <tr class="item" v-for="g in good.list">\n//                     <td>{{g.attr}}</td>\n//                     <td>\n//                         <a href="javascript:void(0)" v-link="{path: \'/goods/analysis\'}">趋势</a>\n//                     </td>\n//                 </tr>\n//                 <tr class="item" v-if="good.list.length==0">\n//                     <td colspan="2">还没有属性，赶紧创建吧</td>\n//                 </tr>\n//             </tbody>\n//         </table>\n//         <div v-if="loading.fetch">\n//             <div class="loading audio-wave"></div>\n//         </div>\n//     </div>\n// </template>\n// <script>\n\n\nvar GoodAttr = Vue.extend({\n    name: \'goodAttr\',\n    data: function data() {\n        return {\n            good: {\n                name: "",\n                list: []\n            },\n            loading: {\n                fetch: false\n            }\n        };\n    },\n    ready: function ready() {\n        this.fetch(true);\n    },\n\n    methods: {\n        fetch: function fetch(reset) {\n            var self = this;\n\n            if (self.loading.fetch) {\n                return;\n            }\n            self.loading.fetch = !self.loading.fetch;\n\n            $.ajax({\n                url: _api2.default.goodsDetail,\n                data: {\n                    id: this.$route.params.id\n                },\n                success: function success(resp) {\n                    self.good = resp;\n                },\n                error: function error(resp) {\n                    self.alert({\n                        show: true,\n                        msg: \'获取商品详情失败\',\n                        type: \'error\'\n                    });\n                }\n            }).always(function () {\n                self.loading.fetch = !self.loading.fetch;\n            });\n        }\n    },\n    vuex: {\n        actions: {\n            alert: _actions2.default.alert\n        }\n    }\n});\nexports.default = GoodAttr;\n// </script>\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10), __webpack_require__(9)))\n\n/*****************\n ** WEBPACK FOOTER\n ** G:/professional/workspace/out2man/kil/~/babel-loader?{"presets":["G://professional//workspace//out2man//kil//~//babel-preset-es2015//index.js"],"plugins":[["G://professional//workspace//out2man//kil//~//babel-plugin-transform-runtime//lib//index.js"]],"cacheDirectory":true}!G:/professional/workspace/out2man/kil/~/vue-loader/lib/selector.js?type=script&index=0!./js/features/goods/goodAttr.vue\n ** module id = 265\n ** module chunks = 12\n **/\n//# sourceURL=webpack:///./js/features/goods/goodAttr.vue?G:/professional/workspace/out2man/kil/~/babel-loader?%7B%22presets%22:%5B%22G://professional//workspace//out2man//kil//~//babel-preset-es2015//index.js%22%5D,%22plugins%22:%5B%5B%22G://professional//workspace//out2man//kil//~//babel-plugin-transform-runtime//lib//index.js%22%5D%5D,%22cacheDirectory%22:true%7D!G:/professional/workspace/out2man/kil/~/vue-loader/lib/selector.js?type=script&index=0')},266:function(module,exports){eval('module.exports = "<div class=\\"panel panel-primary good-attr\\"> <div class=panel-heading>{{good.name}}</div> <table class=table v-if=!loading.fetch> <thead> <tr> <th>属性列表</th> <th>操作</th> </tr> </thead> <tbody> <tr class=item v-for=\\"g in good.list\\"> <td>{{g.attr}}</td> <td> <a href=javascript:void(0) v-link=\\"{path: \'/goods/analysis\'}\\">趋势</a> </td> </tr> <tr class=item v-if=\\"good.list.length==0\\"> <td colspan=2>还没有属性，赶紧创建吧</td> </tr> </tbody> </table> <div v-if=loading.fetch> <div class=\\"loading audio-wave\\"></div> </div> </div>";\n\n/*****************\n ** WEBPACK FOOTER\n ** G:/professional/workspace/out2man/kil/~/vue-html-loader!G:/professional/workspace/out2man/kil/~/vue-loader/lib/selector.js?type=template&index=0!./js/features/goods/goodAttr.vue\n ** module id = 266\n ** module chunks = 12\n **/\n//# sourceURL=webpack:///./js/features/goods/goodAttr.vue?G:/professional/workspace/out2man/kil/~/vue-html-loader!G:/professional/workspace/out2man/kil/~/vue-loader/lib/selector.js?type=template&index=0')}});