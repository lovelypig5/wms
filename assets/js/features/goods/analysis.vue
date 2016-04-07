<template>
    <div class="chart">
        <canvas id="chart" width="700" height="400"></canvas>
    </div>
</template>
<script>
import Chart from 'chart.js';
import API from '../../config/api';
import actions from '../../vuex/actions';

var Analysis = Vue.extend({
    name: 'analysis',
    data() {
        return {
            data: {
                labels: [],
                datasets: []
            }
        }
    },
    watch: {
        data() {
            var ctx = $(this.$el).find("#chart")[0].getContext("2d");
            var myLineChart = new Chart(ctx).Line(this.data, {
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
                legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
            });
        }
    },
    ready() {
        this.getData();
    },
    methods: {
        getData() {
            var self = this;
            $.ajax({
                url: API.trend,
                data: {
                    goods_id: 1
                },
                success(resp) {
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