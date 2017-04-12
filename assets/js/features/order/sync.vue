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
                fetch: false
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
        sync() {
            alert('doSync')
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
