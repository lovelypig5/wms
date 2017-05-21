<script>
import template from 'templates/order/sync.html';
import API from '../../config/api';
import actions from '../../vuex/actions';
import Pagination from '../../common/pagination.vue';
import ETL from '!!raw-loader!../../etl.js';

var SyncOrder = Vue.extend({
    template: template,
    name: 'syncOrder',
    components: {
        pagination: Pagination
    },
    data() {
        return {
            synclist: [],
            loading: {
                fetch: false,
                save: false
            },
            params: {
                page: 1,
                pageSize: 10,
                count: 0
            },
            ETL: ETL,
            show: false
        }
    },
    ready() {
        this.fetch(true);
    },
    methods: {
        change(page) {
            this.params.page = page;
            this.fetch();
        },
        fetch(reset) {
            var self = this;

            if (reset) {
                self.params = {
                    page: 1,
                    pageSize: 10,
                    count: 0
                }
            }

            if (self.loading.fetch) {
                return;
            }
            self.loading.fetch = !self.loading.fetch;

            $.ajax({
                url: API.orderSyncList,
                data: self.params,
                success(resp) {
                    self.synclist = resp.map((order) => {
                        var result = JSON.parse(order.value);
                        result.edit = false;
                        result.flag = order.flag;
                        return result;
                    })
                    self.params.count = resp.count;
                },
                error(resp) {
                    self.alert({
                        show: true,
                        msg: '拉取订单列表失败',
                        type: 'error'
                    })
                }
            }).always(() => {
                self.loading.fetch = !self.loading.fetch;
            })
        },
        showScript() {
            this.show = !this.show;
        },
        sync(order) {
            var self = this;
            if (self.loading.save) {
                return;
            }
            if (!order.expressId) {
                self.alert({
                    show: true,
                    msg: '快递单号不能为空',
                    type: 'error'
                });
                return;
            }
            self.loading.save = !self.loading.save;

            $.ajax({
                url: API.syncOrder,
                type: 'post',
                data: JSON.stringify({
                    orderId: order.orderId,
                    receiveName: order.name,
                    expressId: order.expressId,
                    expressCost: order.expressPrice,
                    goodList: order.goods,
                    price: order.price,
                    comment: order.comment
                }),
                success(resp) {
                    self.alert({
                        show: true,
                        msg: '同步成功',
                        type: 'success'
                    });
                    order.flag = 1;
                },
                error(resp) {
                    self.alert({
                        show: true,
                        msg: resp.responseText || '同步失败',
                        type: 'error'
                    })
                }
            }).always(() => {
                self.loading.save = !self.loading.save;
            })
        }
    },
    vuex: {
        actions: {
            alert: actions.alert
        }
    }
})
export default SyncOrder;
</script>
