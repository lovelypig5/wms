<template>
    <div>
        <alert v-if="alert.show" :alert="alert"></alert>
        <modal v-show="modal.show" :modal="modal"></modal>
    </div>
</template>
<script>
import Alert from './alert.vue';
import Modal from './modal.vue';

var Common = Vue.extend({
    components: {
        alert: Alert,
        modal: Modal
    },
    vuex: {
        getters: {
            alert: state => state.alert,
            modal: state => state.modal
        }
    }
})

export default Common;
</script>