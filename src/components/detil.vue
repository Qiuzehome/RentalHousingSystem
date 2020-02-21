<template>
  <el-container>
    <el-header>
      <el-page-header @back="back"></el-page-header>
    </el-header>
    <el-main>
      <div style="width:500px; height:350px;" id="pic">
        <img v-for="(datas,key) in this.img" :key="key" :src="datas" width="100%" height="100%" />
      </div>
      <p>
        <strong style=" font-size: 40px">{{this.targetHouse.tittle}}</strong>
      </p>
      <p>
        价格：
        <strong style="color: red">{{this.price}}/月</strong>
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
      <!-- <div class="coll">
        <span></span>
        <p>收藏</p>
      </div> -->
    </el-main>
    <el-footer>请你在实地看房签约之前，不要支付任何费用！谨防诈骗！</el-footer>
  </el-container>
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
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = true;
    next();
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
  margin: 100px 0px;
  float: left;
  border: 1px solid;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  /* background-color: white; */
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 10px;
}
.el-main {
  /* background-color:rgba(0.1, 0.1, 0.1, 0.1); */
  width: 65%;
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 160px;
  /* border: 1px solid; */
  margin: 0 auto;
}
p{
  margin-left: 50px;
  height: 20px;
  width: 30%;
  float: left;
  /* margin: 0 0; */
}
.coll {
  bottom: 20%;
  right: 20%;
  position: absolute;
}

</style>