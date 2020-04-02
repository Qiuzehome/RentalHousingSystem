<template>
  <div style="  background-color:white;">
    <Search @searchMsg="searchMsg" @searchMsg0="searchMsg0"></Search>
    <div class="list">
      <div class="sort">
        <span>排序</span>
        <a href="#" @click="def">默认</a>
        <a href="#" @click="low">租金从低到高</a>
        <a href="#" @click="height">租金从高到低</a>
      </div>
      <div class="houselist">
        <ul>
          <li v-for="(datas,key) in this.page_data" :key="key" class="li">
            <House
              @turn_detil="turn_detil"
              :tittle="datas.tittle"
              :location="datas.provinces+'省'+datas.city+datas.area+datas.location"
              :price="datas.price"
              :id="datas.id"
              :src="datas.img.split(',')[0]"
              :phone="datas.phone"
              :roomTyle="datas.room.split('/')"
            ></House>
          </li>
        </ul>
      </div>
    </div>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="this.house_list.length"
        @current-change="current"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import House from "./house";
import Search from "./search";
import bus from "../bus";
export default {
  components: {
    House,
    Search
  },
  data() {
    return {
      currentPage: 1
    };
  },
  methods: {
    ...mapActions(["filterMsg", "keyword", "turn_page", "request_house_list"]),
    ...mapMutations(["reset_house_list"]),
    turn_detil() {
      bus.$emit("turn_detil");
      // this.activeIndex = "";
      //app.vue修改参数
    },
    current(key) {
      this.turn_page(key);
    },
    def() {
      this.reset_house_list();
    },
    low() {
      return this.house_list.sort(function(a, b) {
        return a.price - b.price;
      });
    },
    height() {
      return this.house_list.sort(function(a, b) {
        return -(a.price - b.price);
      });
    },
    searchMsg(val) {
      var price = 0;
      var minPrice = 0,
        maxPrice = 0,
        minRoom = 0,
        maxRoom = 0,
        searchMsg = null;
      if (val.priceLevel == 0) {
        minPrice = Number.NEGATIVE_INFINITY;
        maxPrice = Number.POSITIVE_INFINITY;
      } else if (val.priceLevel == 1000) {
        minPrice = Number.NEGATIVE_INFINITY;
        maxPrice = val.priceLevel;
      } else if (val.priceLevel == 4000) {
        minPrice = val.priceLevel - 500;
        maxPrice = Number.POSITIVE_INFINITY;
      } else {
        minPrice = val.priceLevel - 500;
        maxPrice = val.priceLevel;
      }

      if (val.houseLevel == 0) {
        minRoom = Number.NEGATIVE_INFINITY;
        maxRoom = Number.POSITIVE_INFINITY;
      } else if (val.houseLevel == 5) {
        minRoom = val.houseLevel - 1;
        maxRoom = Number.POSITIVE_INFINITY;
      } else {
        minRoom = val.houseLevel - 1;
        maxRoom = val.houseLevel;
      }
      this.filterMsg({ minPrice, maxPrice, minRoom, maxRoom });
    },
    searchMsg0(val) {
      this.keyword(val);
    }
  },
  mounted() {
    this.request_house_list();
  },
  computed: {
    ...mapState(["house_list", "_house_list", "page_data"])
  }
};
</script>
<style >
#house {
  padding: 5px;
  margin: 10px;
}
.input-with-select {
  width: 50%;
}
.list {
  width: 70%;
  padding: 0px 15%;
}
.sort {
  width: 70%;
  padding: 0px 15%;
}
.li {
  border: 1px dotted #333;
  margin: -1px;
  overflow: auto;
  background-color: white;
}
</style>