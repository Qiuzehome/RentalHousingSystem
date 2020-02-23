<template>
  <el-container>
    <el-main>
      <div style="width:500px; height:350px;" id="pic">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in this.targetHouse.img.split(',')" :key="item">
            <img :src="item" alt width="100%" height="100%" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <p>
        <strong style=" font-size: 40px">{{this.targetHouse.tittle}}</strong>
      </p>
      <p>
        价格：
        <strong style="color: red">{{this.targetHouse.price}}/月</strong>
      </p>
      <p>地点：{{this.targetHouse.provinces+this.targetHouse.city+this.targetHouse.area+ this.targetHouse.location}}</p>
      <p>楼层：{{this.targetHouse.floor}}</p>
      <p>{{this.targetHouse.room.split('/')[0]}}室{{this.targetHouse.room.split('/')[1]}}厅{{this.targetHouse.room.split('/')[2]}}卫</p>
      <p>
        联系方式:
        <strong>{{this.targetHouse.phone}}</strong>
      </p>
      <p>
        其他联系方式:
        <strong>{{this.targetHouse.email}}</strong>
      </p>
      <!-- <div class="coll">
        <span></span>
        <p>收藏</p>
      </div>-->
    </el-main>
    <el-footer>请你在实地看房签约之前，不要支付任何费用！谨防诈骗！</el-footer>
  </el-container>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["reset_house_list"])
  },
  computed: {
    ...mapState(["house_list", "targetHouse"])
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
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
p {
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