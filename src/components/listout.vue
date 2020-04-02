<template>
  <div>
    <div>
      <el-table :data="this.myhouselist" border style="width: 100%">
        <el-table-column prop="tittle" label="房屋" width="120"></el-table-column>
        <el-table-column prop="provinces" label="省份" width="100"></el-table-column>
        <el-table-column prop="city" label="城市" width="100"></el-table-column>
        <el-table-column prop="area" label="区域" width="100"></el-table-column>
        <el-table-column prop="location" label="详细地址" width="300"></el-table-column>
        <el-table-column prop="price" label="月租" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="rankout(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return { myhouselist: [] };
  },
  computed: {
    ...mapState(["house_list", "user"]),
    ...mapActions(["request_house_list"])
  },
  methods: {
    rankout: function(row) {
      this.house = [];
      this.axios({
        methods: "post",
        url: "/rankout",
        params: {
          id: row.id
        }
      }).then(() => {
        this.$notify({
          title: "删除",
          message: "该房屋已删除",
          type: "success"
        }).then(location.reload());
      });
    },
    getHouseList() {
      this.axios({
        methods: "get",
        url: "/getHouseList",
        params: {
          user: window.document.cookie.split("=")[1]
        }
      }).then(res => {
        this.myhouselist = res.data;
      });
    }
  },
  mounted() {
    this.getHouseList();
  }
};
</script>
<style scoped>
div {
  float: left;
}
div.el-table {
  margin: 40px 35%;
}
</style>