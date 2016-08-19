import Validator from 'vue-validator';

var init = () => {
    Vue.use(Validator);

    Vue.validator('email', function(val) {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
    })

    Vue.validator('number', function(val) {
        return /^[-]?[0-9]+(.[0-9]*)?$/.test(val)
    })

    Vue.validator('posInt', function(val) {
        return /^[0-9]*$/.test(val)
    })

    Vue.validator('posFloat', function(val) {
        return /^[1-9][0-9]*(.?[1-9]*)$/.test(val)
    })
}

export default {
    init: init
};