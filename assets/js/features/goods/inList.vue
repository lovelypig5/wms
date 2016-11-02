<script>
import template from 'templates/goods/inList.html';
import API from '../../config/api';
import actions from '../../vuex/actions';
import Pagination from '../../common/pagination.vue';

var InList = Vue.extend({
    template: template,
    name: 'inList',
    components: {
        pagination: Pagination
    },
    data() {
        return {
            inList: [],
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
        edit(record) {
            Vue.set(record, 'edit', !record.edit);
        },
        save(record) {
            var self = this;
            record.type = -1;
            $.ajax({
                url: API.modifyInOut,
                type: 'post',
                data: JSON.stringify(record),
                success(resp) {

                },
                error(resp) {
                    self.alert({
                        show: true,
                        msg: resp || '修改入库记录失败',
                        type: 'error'
                    })
                }
            }).always(() => {
                Vue.set(record, 'edit', !record.edit);
            })
        },
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
                url: API.inList,
                data: self.params,
                success(resp) {
                    self.inList = resp.content;
                    self.params.count = Math.ceil(resp.count / self.params.pageSize);
                },
                error(resp) {
                    self.alert({
                        show: true,
                        msg: '拉取入库记录失败',
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
export default InList;
</script>
