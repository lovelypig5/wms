const actions = {
    modal(store, obj) {
        store.dispatch('MODAL', obj);
    },
    alert(store, obj) {
        store.dispatch('ALERT', obj);
    },
    user(store) {
        store.dispatch('USER');
    },
    changeLocale(store, lang) {
        store.dispatch('LOCALE');
    },
    logout(store) {
        store.dispatch('LOGOUT');
    },
    isLogin(store) {
        store.dispatch('ISLOGIN');
    }
};
export default actions;
