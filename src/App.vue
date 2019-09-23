<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.el-form-item__label {
    color: #fff;
  }
.el-icon-info:before {
    content: "";
}
body {
    background: url("../static/img/bg.jpg");
    width: 99%;
    height: 100%;
  }
</style>
