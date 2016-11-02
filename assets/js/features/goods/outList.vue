<script>
import template from 'templates/goods/outList.html';
import API from '../../config/api';
import actions from '../../vuex/actions';
import Pagination from '../../common/pagination.vue';

var OutList = Vue.extend({
    template: template,
    name: 'outList',
    components: {
        pagination: Pagination
    },
    data() {
        return {
            outList: [],
            loading: {
                fetch: false
            },
            params: {
                page: 1,
                pageSize: 10,
                count: 0,
                type: 1
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
        edit(record) {
            Vue.set(record, 'edit', !record.edit);
        },
        save(record) {
            var self = this;
            record.type = 1;
            $.ajax({
                url: API.modifyInOut,
                type: 'post',
                data: JSON.stringify(record),
                success(resp) {

                },
                error(resp) {
                    self.alert({
                        show: true,
                        msg: resp || '修改出库记录失败',
                        type: 'error'
                    })
                }
            }).always(() => {
                Vue.set(record, 'edit', !record.edit);
            })
        },
        fetch(reset) {
            var self = this;

            if (reset) {
                self.params = {
                    page: 1,
                    pageSize: 10,
                    count: 0,
                    type: 1
                }
            }

            if (self.loading.fetch) {
                return;
            }
            self.loading.fetch = !self.loading.fetch;

            $.ajax({
                url: API.outList,
                data: self.params
            }).done((resp) => {
                self.outList = resp.content;
                self.params.count = Math.ceil(resp.count / self.params.pageSize);
            }).fail((resp) => {
                self.alert({
                    show: true,
                    msg: '拉取出库记录失败',
                    type: 'error'
                })
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
export default OutList;
</script>
