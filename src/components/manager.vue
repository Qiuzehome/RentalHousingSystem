<template>
  <div>
    <el-page-header @back="back"></el-page-header>
    <img src alt />
  </div>
</template>
<script>
export default {
  methods: {
    back: function() {
      this.$router.go(-1);
    }
  }
};
</script>