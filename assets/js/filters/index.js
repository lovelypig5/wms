Vue.filter('remove-whitespace', (attr) => {
    return attr.replace(/,/g, ' ');
})

Vue.filter('join-attrs', (attrs) => {
    var temp = [];
    attrs.forEach((item) => {
        temp.push(item.attr);
    })
    return temp.join(' ');
})
