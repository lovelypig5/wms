<template>
<div class="container home" v-if="$route.path == '/' || $route.path == '/home'">
    <div class="jumbotron">
        <h2>版本1.0.0正式发布 <span class="label label-success">New</span></h2>
        <div class="page-header">
            <h4>版本说明：</h4>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">商品管理功能</div>
            <div class="panel-body">
                <ul>
                    <li>新商品：每个商品暂时只包含商品名称和商品属性</li>
                    <li>商品属性的自由创建和添加：从设计上来说，商品属性是属于商品的一部分特征，它可以被自由的增加到商品上，没有明确的类别设置</li>
                    <li>自由化的商品入库：自定义的组合属性入库商品，并且组合属性会单独记录库存</li>
                    <li>出库：类似入库的方式</li>
                    <li>出入库记录：组合属性级别的出入库记录</li>
                </ul>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">未来版本功能预测</div>
            <div class="panel-body">
                <ul>
                    <li>商品数据统计：商品库存，今日数据</li>
                    <li>库存趋势：用于分析商品未来库存走势，已经库存告罄的大概时间节点</li>
                    <li>利润趋势：用于分析商品出售产生的总体利润</li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import DICT from '../../config/dict';

var Home = Vue.extend({
    name: 'goods',
    data() {
        return {
            menu: DICT.goodsMenu,
            path: ['/analysis', '/list', '/out', '/in', '/outList', '/inList', '/create']
        }
    },
    methods: {
        change(index) {
            this.selectIdx = index;
        }
    }
})

export default Home;
</script>
