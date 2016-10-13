<template>
<header>
    <nav class="navbar navbar-default">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                    aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                <a class="navbar-brand" href="javascript:void(0)">{{$t('brand')}}</a>
            </div>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li>
                        <router-link to="{path: '/home', activeClass: 'active'}">{{ $t("home") }} <span class="sr-only">(current)</span></router-link>
                    </li>
                    <li v-if="user.id">
                        <router-link to="{path: '/goods/list', activeClass: 'active'}">{{ $t("goods") }}</router-link>
                    </li>
                    <li v-if="user.id">
                        <router-link to="{path: '/order/list', activeClass: 'active'}">{{ $t("order") }}</router-link>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right" v-if="!user.id">
                    <li><a href="javascript:void(0)" @click="login">{{$t('action_login')}}</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right" v-if="user.id">
                    <li class="dropdown">
                        <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                {{user.name}}<span class="caret"></span>
                            </a>
                        <ul class="dropdown-menu">
                            <li><a href="javascript:void(0)" @click="changeLocale('en')">{{$t('text_language')}}</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="javascript:void(0)" @click="logout">{{$t('action_logout')}}</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
</template>
<script>
import LoginPopup from '../common/login.vue';
import actions from '../vuex/actions';

var AppHeader = Vue.extend({
    mounted() {
        this.getUser();
    },
    vuex: {
        getters: {
            lang: state => state.lang,
            user: state => state.user
        },
        actions: {
            changeLocale: actions.changeLocale,
            login(store) {
                actions.modal(store, {
                    show: true,
                    type: 'default',
                    options: {
                        backdrop: 'static'
                    },
                    component: LoginPopup
                })
            },
            logout: actions.logout,
            getUser: actions.user
        }
    }
})
export default AppHeader;
</script>
