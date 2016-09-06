<template>
    <nav class="center">
        <ul class="pagination" v-show="pagination.count > 1">
            <li :class="{disabled: pagination.page <= 1}" @click="back10">
                <a href="javascript:void(0)" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li v-for="i in pagination.count" v-if="i >= pagination.page - 1 && i < pagination.page + 9" :class="{active: pagination.page == i + 1}" @click="change(i+1)"><a href="javascript:void(0)">{{ i + 1 }}</a></li>
            <li :class="{disabled: pagination.page >= pagination.count}" @click="forword10">
                <a href="javascript:void(0)" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>
<script>
var Pagination = Vue.extend({
    props: ['pagination', 'change'],
    methods: {
        back10() {
            if (this.pagination.page <= 1) {
                return
            }
            var page = this.pagination.page - 10 < 1 ? 1 : this.pagination.page - 10;
            this.change(page);
        },
        forword10() {
            if (this.pagination.page >= this.pagination.count) {
                return
            }
            var page = this.pagination.page + 10 > this.pagination.count ? this.pagination.count : this.pagination.page + 10;
            this.change(page);
        }
    }
})

export default Pagination;
</script>
