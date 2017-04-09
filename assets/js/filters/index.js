Vue.filter('remove-whitespace', (attr) => {
    return attr.replace(/,/g, ' ');
});

Vue.filter('join-attrs', (attrs, name, sep) => {
    var temp = [];
    attrs.forEach((item) => {
        var result = item[!name ? 'attr' : name];
        if (!result) {
            result = item;
        }
        temp.push(result);
    });
    return temp.join(!sep ? ' ' : sep);
});
