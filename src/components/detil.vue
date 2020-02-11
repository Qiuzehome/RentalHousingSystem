<template>
  <div>
    <el-page-header @back="back"></el-page-header>
    <div style="width:500px; height:350px;" id="pic">
      <img v-for="(datas,key) in this.img" :key="key" :src="datas" width="100%" height="100%" />
    </div>
    <div id="mes">
      <strong style=" font-size: 40px">{{this.targetHouse.tittle}}</strong>
      <p style="color: red">
        价格：
        <strong>{{this.price}}/月</strong>
      </p>
      <p>地点：{{this.location}}</p>
      <p>楼层：{{this.floor}}</p>
      <p>{{this.roomTyle[0]}}室{{this.roomTyle[1]}}厅{{this.roomTyle[2]}}卫</p>
      <p>
        联系方式:
        <strong>{{this.phone}}</strong>
      </p>
      <p>
        其他联系方式:
        <strong>{{this.email}}</strong>
      </p>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      img: [],
      price: 0,
      location: "广州天河岗顶",
      phone: null,
      email: null,
      floor: null,
      roomTyle: null
    };
  },
  methods: {
    ...mapMutations(["reset_house_list"]),
    back: function() {
      this.reset_house_list();
      this.$router.go(-1);
    },
    getPic() {
      var houseID = null;
      for (let i = 0; i < this.house_list.length; i++) {
        houseID = this.house_list[i].id;
        if (this.targetHouse.id == houseID) {
          this.targetHouse.tittle = this.house_list[i].tittle;
          this.phone = this.house_list[i].phone;
          this.email = this.house_list[i].email;
          this.price = this.house_list[i].price;
          this.floor = this.house_list[i].floor;
          this.roomTyle = this.house_list[i].room.split("/");
          this.location =
            this.house_list[i].provinces +
            "省" +
            this.house_list[i].city +
            this.house_list[i].area +
            this.house_list[i].location;
        }
      }
      for (let i = 0; i < this.house_list.length; i++) {
        if (this.house_list[i].id == this.targetHouse.id) {
          this.img = this.house_list[i].img.split(",");
        }
      }
    }
  },
  computed: {
    ...mapState(["house_list", "targetHouse"])
  },
  created() {
    this.getPic();
  }
};
</script>
<style scoped>
#pic {
  margin: 100px 100px;
  float: left;
  border: 1px solid;
}
#mes {
  padding-left: 100px;
  float: left;
  padding-top: 100px;
}
</style>