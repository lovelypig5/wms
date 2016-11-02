<script>
import template from 'templates/goods/goodList.html';
import API from '../../config/api';
import actions from '../../vuex/actions';

var GoodList = Vue.extend({
    template: template,
    name: 'goodList',
    data() {
        return {
            goodList: [],
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
        fetch(reset) {
            var self = this;

            if (reset) {
                self.params = {
                    page: 1,
                    pageSize: 10,
                    count: 0
                }
            }
            else {
                self.params.page += 1;
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
        }
    },
    vuex: {
        actions: {
            alert: actions.alert
        }
    }
})
export default GoodList;
</script>
