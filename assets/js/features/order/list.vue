<script>
import template from 'templates/order/list.html';
import API from '../../config/api';
import actions from '../../vuex/actions';
import Pagination from '../../common/pagination.vue';

var OrderList = Vue.extend({
    template: template,
    name: 'orderList',
    components: {
        pagination: Pagination
    },
    data() {
        return {
            orderList: [],
            loading: {
                fetch: false
            },
            params: {
                page: 1,
                pageSize: 10,
                count: 0
            }
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
                url: API.orderList,
                data: self.params,
                success(resp) {
                    self.orderList = resp.content;
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
        }
    },
    vuex: {
        actions: {
            alert: actions.alert
        }
    }
})
export default OrderList;
</script>
