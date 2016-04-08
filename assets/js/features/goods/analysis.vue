<template>
    <div class="chart">
        <div class="list">
            请选择商品：
            <select v-model="choose">
                <option :value="good.id" v-for="good in goodList">{{good.name}}</option>
            </select>
        </div>
        <canvas id="chart" width="700" height="400"></canvas>
    </div>
</template>
<script>
import Chart from 'chart.js';
import API from '../../config/api';
import actions from '../../vuex/actions';

const opt = {
    fillColor: "rgba(151,187,205,0.2)",
    strokeColor: "rgba(151,187,205,1)",
    pointColor: "rgba(151,187,205,1)",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(151,187,205,1)"
};

var Analysis = Vue.extend({
    name: 'analysis',
    data() {
        return {
            data: {
                labels: [],
                datasets: []
            },
            loading: {
                fetch: false
            },
            goodList: [],
            choose: "",
        }
    },
    watch: {
        data() {
            if (this.mychart) {
                this.mychart.destroy();
            }

            var ctx = $(this.$el).find("#chart")[0].getContext("2d");
            this.mychart = new Chart(ctx).Line(this.data, {
                scaleShowGridLines: true,
                scaleGridLineColor: "rgba(0,0,0,.05)",
                scaleGridLineWidth: 1,
                scaleShowHorizontalLines: true,
                scaleShowVerticalLines: true,
                bezierCurve: true,
                bezierCurveTension: 0.4,
                pointDot: true,
                pointDotRadius: 4,
                pointDotStrokeWidth: 1,
                pointHitDetectionRadius: 20,
                datasetStroke: true,
                datasetStrokeWidth: 2,
                datasetFill: true,
                responsive: true,
                legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
            });
        },
        choose() {
            this.getData();
        }
    },
    ready() {
        this.getGoods();


    },
    methods: {
        getGoods() {
            var self = this;

            self.params = {
                page: 1,
                pageSize: 10,
                count: 0
            }
            if (self.loading.fetch) {
                return;
            }
            self.loading.fetch = !self.loading.fetch;

            $.ajax({
                url: API.goodList,
                data: self.params,
                success(resp) {
                    self.goodList = resp.content;
                    self.params.total = resp.total;
                    self.params.totalPage = resp.total / self.params.pageSize;
                },
                error(resp) {
                    self.alert({
                        show: true,
                        msg: '拉取商品列表失败',
                        type: 'error'
                    })
                }
            }).always(() => {
                self.loading.fetch = !self.loading.fetch;
            })
        },
        getData() {
            var self = this;
            $.ajax({
                url: API.trend,
                data: {
                    goods_id: this.choose
                },
                success(resp) {
                    var data = resp;
                    for (var i = 0; i < data.datasets.length; i++) {
                        Object.assign(data.datasets[i], opt);
                    }
                    self.data = resp;
                },
                error(resp) {
                    self.alert({
                        show: true,
                        msg: resp.responseText || '获取趋势数据失败',
                        type: 'error'
                    })
                }
            })
        }
    },
    vuex: {
        actions: {
            alert: actions.alert
        }
    }
})
export default Analysis;
</script>
