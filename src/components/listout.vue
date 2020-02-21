<template>
  <div>
    <div>
      <el-table :data="house" border style="width: 100%">
        <el-table-column prop="tittle" label="房屋" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" width="300"></el-table-column>
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
import { mapState } from "vuex";
import House from "./house";
export default {
  data() {
    return {
      house: []
    };
  },
  components: {
    House
  },
  mounted() {
    this.getHouse();
  },
  computed: {
    ...mapState(["house_list", "user"])
  },
  methods: {
    manager: function() {
      this.$router.push({ path: "/manager" });
    },
    getHouse: function() {
      for (let i = 0; i < this.house_list.length; i++) {
        if (this.house_list[i].landlord == this.user.user) {
          this.house.push(this.house_list[i]);
          this.house_list[i].address =
            this.house_list[i].provinces +
            "省" +
            this.house_list[i].city +
            this.house_list[i].area +
            this.house_list[i].location;
        }
      }
    },
    rankout: function(row) {
      console.log(row.id);
      this.house = [];
      this.axios({
        methods: "post",
        url: "/rankout",
        params: {
          id: row.id
        }
      })
        .then(
          this.$notify({
            title: "删除",
            message: "该房屋已删除",
            type: "success"
          })
        )
        .then(this.getHouse());
    }
  }
};
</script>
<style scoped>
div {
  float: left;
}
div.el-table {
  margin: 40px 50%;
}
</style>