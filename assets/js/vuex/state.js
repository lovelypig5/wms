Vue.config.lang = 'zh';

const state = {
    alert: {
        show: false,
        msg: '',
        type: 'default'
    },
    modal: {
        show: false,
        type: 'default',
        options: {},
        component: ''
    },
    user: {},
    lang: Vue.config.lang
}

export default state;