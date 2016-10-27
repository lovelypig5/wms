Vue.filter('remove-whitespace', (attr) => {
    return attr.replace(/,/g, ' ');
})

Vue.filter('join-attrs', (attrs, name, sep) => {
    var temp = [];
    attrs.forEach((item) => {
        temp.push(item[!name ? 'attr' : name]);
    })
    return temp.join(!sep ? ' ' : sep);
})
