<template>
  <div id="house">
    <div class="img" style="width:250px; height:200px; border:1px solid grey;">
      <img
        :src="src"
        @click="see_detail"
        :id="this.id"
        width="100%"
        height="100%"
        style="cursor:pointer"
      />
    </div>
    <div class="mes">
      <a href="#">
        <strong style="color:orange;font-size:30px">{{this.tittle}}</strong>
      </a>
      <p style="color:red">
        <b style="font-size:30px">{{this.price}}</b>/月
      </p>
      <p>地点：{{this.location}}</p>
      <p>{{this.roomTyle[0]}}室{{this.roomTyle[1]}}厅{{this.roomTyle[2]}}卫</p>
    </div>
    <div class="ranker">
      <span>联系方式:{{this.phone}}</span>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    tittle: {
      type: String,
      default: ""
    },
    price: {
      type: Number,
      default: null
    },
    location: {
      type: String,
      default: ""
    },
    delect: {
      type: String,
      default: ""
    },
    src: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    },
    roomTyle: {
      type: Array,
      default: () => [1, 2, 3]
    },
    phone: {
      type: String,
      default: "1234567890"
    }
  },
  methods: {
    ...mapMutations(["set_targetHouse"]),
    see_detail: function(e) {
      this.set_targetHouse(e.target.id);
      this.$emit("turn_detil")
      this.$router.push({ path: "/detil" });
    }
  }
};
</script>
<style>
.img {
  float: left;
  margin-bottom: 15px;
}
.mes {
  display: inline;
}
.ranker {
  float: right;
}
</style>