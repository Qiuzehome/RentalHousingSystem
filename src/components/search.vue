<template>
  <div class="header">
    <div class="radio">
      <span>租金:</span>
      <el-radio v-model="searchInfo.priceLevel" label="0">不限</el-radio>
      <el-radio v-model="searchInfo.priceLevel" label="1000">1000以下</el-radio>
      <el-radio v-model="searchInfo.priceLevel" label="1500">1000-1500元</el-radio>
      <el-radio v-model="searchInfo.priceLevel" label="2000">1500-2000元</el-radio>
      <el-radio v-model="searchInfo.priceLevel" label="2500">2000-2500元</el-radio>
      <el-radio v-model="searchInfo.priceLevel" label="3000">2500-3000元</el-radio>
      <el-radio v-model="searchInfo.priceLevel" label="3500">3000-3500元</el-radio>
      <el-radio v-model="searchInfo.priceLevel" label="4000">3500元以上</el-radio>
    </div>
    <div class="radio">
      <span>户型:</span>
      <el-radio v-model="searchInfo.houseLevel" label="0">不限</el-radio>
      <el-radio v-model="searchInfo.houseLevel" label="1">一室</el-radio>
      <el-radio v-model="searchInfo.houseLevel" label="2">二室</el-radio>
      <el-radio v-model="searchInfo.houseLevel" label="3">三室</el-radio>
      <el-radio v-model="searchInfo.houseLevel" label="4">四室</el-radio>
      <el-radio v-model="searchInfo.houseLevel" label="5">四室以上</el-radio>
    </div>
    <el-input placeholder="请输入关键词开始找房" v-model="search_msg" class="input-with-select">
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search_msg: null,
      searchInfo: { priceLevel: "0", houseLevel: "0" },
      search_list: []
    };
  },
  methods: {
    search: function() {
      this.$emit("searchMsg0", this.search_msg);
    }
  },
  watch: {
    searchInfo: {
      handler(val) {
        this.search_msg = null;
        this.$emit("searchMsg", val);
      },
      deep: true
    }
  }
};
</script>
<style>
.radio {
  margin: 10px;
}
.header {
  margin-top: 15px;
  background-image: linear-gradient(to right, orange, pink);
}
.input-with-select {
  margin-bottom: 10px;
}
</style>
