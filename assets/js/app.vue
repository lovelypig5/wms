<template>
    <div>
        <app-header></app-header>
        <router-view></router-view>
        <app-footer></app-footer>
        <common></common>
    </div>
</template>
<script>
import store from './vuex/store';
import acitons from './vuex/actions';
import AppHeader from './layout/appHeader.vue';
import AppFooter from './layout/appFooter.vue';
import Common from './common/index.vue';
import LoginPopup from './common/login.vue';

$.ajaxSetup({
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    statusCode: {
        401: () => {
            acitons.modal(store, {
                show: true,
                type: 'default',
                options: {
                    backdrop: 'static'
                },
                component: LoginPopup
            });
        }
    }
})

var App = Vue.extend({
    store,
    components: {
        appHeader: AppHeader,
        appFooter: AppFooter,
        common: Common
    }
})
export default App;
</script>