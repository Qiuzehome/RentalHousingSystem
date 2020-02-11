<template>
  <div>
    <div>
      <header id="header_box">
        <div class="header_a">
          <a @click="load">登录</a>
        </div>
        <div class="header_a">
          <a @click="register">注册</a>
        </div>
        <div class="header_a">
          <a @click="out">注销</a>
        </div>
        <div class="header_a">
          <a @click="changeLocation">{{this.location}}</a>
        </div>
      </header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2" :disabled="Boolean(!this.state)" title="请先登录">我要出租</el-menu-item>
        <el-menu-item index="3" :disabled="Boolean(!this.state)" title="请先登录">房屋管理</el-menu-item>
        <el-menu-item index="4" :disabled="Boolean(!this.state)">个人信息</el-menu-item>
      </el-menu>
      <el-row v-if="show_home">
        <Houselist></Houselist>
      </el-row>
    </div>

    <el-dialog
      title="登录"
      :visible.sync="dialogFormVisible"
      center
      :append-to-body="true"
      :lock-scroll="false"
      width="30%"
    >
      <Load @load_scuess="load_scuess"></Load>
    </el-dialog>
    <Rank v-if="show_rank" @afterRank="afterRank"></Rank>
    <Regist v-if="show_rigst"></Regist>
    <Personal v-if="show_personal"></Personal>
    <Listout v-if="show_listout"></Listout>
  </div>
</template>
<script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>
<script>
import Houselist from "./house_list";
import Rank from "./rank";
import Regist from "./regist";
import Load from "./load";
import Listout from "./listout";
import Personal from "./personal";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      // state: this.state,
      show_home: 1,
      show_rigst: 0,
      show_rank: 0,
      show_personal: 0,
      show_listout: 0,
      location: "广东",
      dialogFormVisible: false
    };
  },
  mounted() {
    let script = document.createElement("script");
    script.src = "http://pv.sohu.com/cityjson?ie=utf-8";
    document.body.appendChild(script);
    script.addEventListener("load", function() {
      this.location = returnCitySN.cname;
    });
  },
  methods: {
    ...mapMutations(["set_state", "reset_house_list"]),
    load() {
      if (this.state == 1) {
        this.$notify({
          title: "登录失败",
          message: "请先注销当前账号",
          type: "warning"
        });
      } else {
        this.dialogFormVisible = true;
      }
    },
    load_scuess() {
      this.dialogFormVisible = false;
    },
    handleSelect(key, keyPath) {
      if (key == 1) {
        this.show_home = 1;
        this.show_rank = 0;
        this.show_rigst = 0;
        this.show_personal = 0;
        this.show_listout = 0;
      } else if (key == 2) {
        if (this.state == 1) {
          this.reset_house_list();
          this.show_home = 0;
          this.show_rank = 1;
          this.show_rigst = 0;
          this.show_personal = 0;
          this.show_listout = 0;
        } else {
          this.$alert("请先登录");
        }
      } else if (key == "3") {
        this.reset_house_list();
        this.show_home = 0;
        this.show_rank = 0;
        this.show_personal = 0;
        this.show_listout = 1;
        this.show_rigst = 0;
      } else if (key == 4) {
        this.reset_house_list();
        this.show_home = 0;
        this.show_rank = 0;
        this.show_rigst = 0;
        this.show_listout = 0;
        this.show_personal = 1;
      }
    },
    afterRank() {
      this.handleSelect(1);
    },
    register: function() {
      this.$router.push({ path: "/regist" });
    },

    out: function() {
      if (this.state == 1) {
        this.set_state();
        this.user = null;

        this.$notify({
          title: "注销成功",
          message: "当前以退出登录状态",
          type: "success"
        });
      } else {
        this.$notify({
          title: "注销失败",
          message: "当前尚未登录",
          type: "warning"
        });
      }
    },
    changeLocation: function() {
      this.location = "11";
    }
  },
  computed: {
    ...mapState(["state"])
  },
  components: {
    Houselist,
    Rank,
    Regist,
    Load,
    Personal,
    Listout
  }
};
</script>
<style scoped>
#header_box {
  display: flex;
  width: 20%;
  /* float: right; */
  /* position: absolute; */
  overflow: auto;
}

.header_a {
  padding-left: 10px;
  font-size: 12px;
  color: cornflowerblue;
}
#location {
  float: right;
  overflow: auto;
  display: none;
}
a {
  cursor: pointer;
}
</style>