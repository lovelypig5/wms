webpackJsonp([3],{68:function(module,exports){eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nvar dict = {\n    goodsMenu: ['text_goods_state', 'text_goods_list', 'text_goods_out', 'text_goods_in', 'text_goods_outlist', 'text_goods_inlist', 'text_goods_create'],\n    orderMenu: ['text_order_list', 'text_order_create'],\n    select2: {\n        \"zh\": {\n            errorLoading: function errorLoading() {\n                return '无法载入结果。';\n            },\n            inputTooLong: function inputTooLong(args) {\n                var overChars = args.input.length - args.maximum;\n\n                var message = '请删除' + overChars + '个字符';\n\n                return message;\n            },\n            inputTooShort: function inputTooShort(args) {\n                var remainingChars = args.minimum - args.input.length;\n\n                var message = '请再输入至少' + remainingChars + '个字符';\n\n                return message;\n            },\n            loadingMore: function loadingMore() {\n                return '载入更多结果…';\n            },\n            maximumSelected: function maximumSelected(args) {\n                var message = '最多只能选择' + args.maximum + '个项目';\n\n                return message;\n            },\n            noResults: function noResults() {\n                return '未找到结果';\n            },\n            searching: function searching() {\n                return '搜索中…';\n            }\n        }\n    }\n};\n\nexports.default = dict;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./js/config/dict.js\n ** module id = 68\n ** module chunks = 2 3 7 8 13 15\n **/\n//# sourceURL=webpack:///./js/config/dict.js?")},70:function(module,exports,__webpack_require__){eval('var __vue_script__, __vue_template__\n__vue_script__ = __webpack_require__(71)\n__vue_template__ = __webpack_require__(72)\nmodule.exports = __vue_script__ || {}\nif (module.exports.__esModule) module.exports = module.exports.default\nif (__vue_template__) {\n(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__\n}\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./js/features/goods/index.vue\n ** module id = 70\n ** module chunks = 3\n **/\n//# sourceURL=webpack:///./js/features/goods/index.vue?')},71:function(module,exports,__webpack_require__){eval('/* WEBPACK VAR INJECTION */(function(Vue) {\'use strict\';\n\nObject.defineProperty(exports, "__esModule", {\n    value: true\n});\n\nvar _dict = __webpack_require__(68);\n\nvar _dict2 = _interopRequireDefault(_dict);\n\nvar _actions = __webpack_require__(61);\n\nvar _actions2 = _interopRequireDefault(_actions);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// <template>\n//     <div class="container" v-if="user.id">\n//         <div class="col-sm-3">\n//             <div class="list-group">\n//                 <a href="javascript:void(0)" v-link="{path: \'/goods\' + path[$index], activeClass:\'active\'}" class="list-group-item" v-for="item in menu">{{ $t(item) }} </a>\n//             </div>\n//         </div>\n//         <div class="col-sm-9 content">\n//             <router-view transition="fade" transition-mode="out-in"></router-view>\n//         </div>\n//     </div>\n// </template>\n// <script>\n\n\nvar Goods = Vue.extend({\n    name: \'goods\',\n    data: function data() {\n        return {\n            menu: _dict2.default.goodsMenu,\n            path: [\'/analysis\', \'/list\', \'/out\', \'/in\', \'/outList\', \'/inList\', \'/create\']\n        };\n    },\n    ready: function ready() {\n        this.isLogin();\n    },\n\n    methods: {\n        change: function change(index) {\n            this.selectIdx = index;\n        }\n    },\n    vuex: {\n        getters: {\n            user: function user(state) {\n                return state.user;\n            }\n        },\n        actions: {\n            isLogin: _actions2.default.isLogin\n        }\n    }\n});\n\nexports.default = Goods;\n// </script>\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))\n\n/*****************\n ** WEBPACK FOOTER\n ** G:/professional/workspace/out2man/kil/~/babel-loader?{"presets":["G://professional//workspace//out2man//kil//~//babel-preset-es2015//index.js"],"plugins":[["G://professional//workspace//out2man//kil//~//babel-plugin-transform-runtime//lib//index.js"]],"cacheDirectory":true}!G:/professional/workspace/out2man/kil/~/vue-loader/lib/selector.js?type=script&index=0!./js/features/goods/index.vue\n ** module id = 71\n ** module chunks = 3\n **/\n//# sourceURL=webpack:///./js/features/goods/index.vue?G:/professional/workspace/out2man/kil/~/babel-loader?%7B%22presets%22:%5B%22G://professional//workspace//out2man//kil//~//babel-preset-es2015//index.js%22%5D,%22plugins%22:%5B%5B%22G://professional//workspace//out2man//kil//~//babel-plugin-transform-runtime//lib//index.js%22%5D%5D,%22cacheDirectory%22:true%7D!G:/professional/workspace/out2man/kil/~/vue-loader/lib/selector.js?type=script&index=0')},72:function(module,exports){eval('module.exports = "<div class=container v-if=user.id> <div class=col-sm-3> <div class=list-group> <a href=javascript:void(0) v-link=\\"{path: \'/goods\' + path[$index], activeClass:\'active\'}\\" class=list-group-item v-for=\\"item in menu\\">{{ $t(item) }} </a> </div> </div> <div class=\\"col-sm-9 content\\"> <router-view transition=fade transition-mode=out-in></router-view> </div> </div>";\n\n/*****************\n ** WEBPACK FOOTER\n ** G:/professional/workspace/out2man/kil/~/vue-html-loader!G:/professional/workspace/out2man/kil/~/vue-loader/lib/selector.js?type=template&index=0!./js/features/goods/index.vue\n ** module id = 72\n ** module chunks = 3\n **/\n//# sourceURL=webpack:///./js/features/goods/index.vue?G:/professional/workspace/out2man/kil/~/vue-html-loader!G:/professional/workspace/out2man/kil/~/vue-loader/lib/selector.js?type=template&index=0')}});