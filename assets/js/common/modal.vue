<template>
    <div class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content" id="modal-content">
                <component :is="modal.component"></component>
            </div>
        </div>
    </div>
</template>
<script>
import LoginPopup from './login.vue';

var Modal = Vue.extend({
    props: ['modal'],
    ready() {
        var self = this;
        $(self.$el).on('hidden.bs.modal', (e) => {
            self.modal = {
                show: false,
                type: 'default',
                options: {},
                component: ''
            };
        }).on('show.bs.modal', () => {
            var $modal_dialog = $(self.$el).find('.modal-dialog');
            $(self.$el).css('display', 'block');
            $modal_dialog.css({
                'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 2)
            });
        });
    },
    watch: {
        modal(val, oldVal) {
            if (!oldVal.show && val.show) {
                $(this.$el).modal(this.modal.options || {});
            }
        }
    }
})

export default Modal;
</script>