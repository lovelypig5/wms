<template>
<div :class="'alert alert-dismissible alert-'+alert.type" role="alert">
    <!-- <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
</button> -->
    {{alert.msg}}
</div>
</template>
<script>
var Alert = Vue.extend({
    props: ['alert']
})

export default Alert;
</script>
