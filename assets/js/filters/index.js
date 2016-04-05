Vue.filter('remove-whitespace', (attr) => {
    return attr.replace(/,/g, ' ');
})