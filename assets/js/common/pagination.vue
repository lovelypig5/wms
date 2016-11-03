<script>
import template from 'templates/common/pagination.html';
var Pagination = Vue.extend({
    template: template,
    props: ['pagination', 'change', 'pageNum'],
    created() {
        if (!this.pageNum) {
            this.pageNum = 10;
        }
        this.pageNum = parseInt(this.pageNum);
    },
    computed: {
        pageNumHalf() {
            return Math.ceil(this.pageNum / 2);
        },
        lower() {
            var lower = this.pagination.page - this.pageNumHalf;
            var upper = this.pagination.page + this.pageNumHalf - 1;
            if (upper > this.totalPage) {
                lower = this.totalPage - this.pageNum;
            }
            if (lower < 0) {
                lower = 0;
            }

            return lower;
        },
        upper() {
            var lower = this.pagination.page - this.pageNumHalf;
            var upper = this.pagination.page + this.pageNumHalf - 1;
            if (lower < 0) {
                upper = this.pageNum;
            }
            if (upper > this.totalPage) {
                upper = this.totalPage;
            }

            return upper;
        },
        totalPage() {
            return Math.ceil(this.pagination.count / this.pagination.pageSize);
        }
    },
    methods: {
        back() {
            if (this.pagination.page <= 1) {
                return
            }
            var page = this.pagination.page - this.pageNum < 1 ? 1 : this.pagination.page - this.pageNum;
            this.change(page);
        },
        forword() {
            if (this.pagination.page >= this.totalPage) {
                return
            }
            var page = this.pagination.page + this.pageNum > this.totalPage ? this.totalPage : this.pagination.page +
                this.pageNum;
            this.change(page);
        }
    }
})

export default Pagination;
</script>
