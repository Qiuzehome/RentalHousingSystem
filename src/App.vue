<template>
  <div id="app">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="houseList">首页</el-menu-item>
      <el-menu-item index="rank" :disabled="Boolean(!this.state)" title="请先登录">我要出租</el-menu-item>
      <el-menu-item index="list_out" :disabled="Boolean(!this.state)" title="请先登录">房屋管理</el-menu-item>
      <el-menu-item index="personal" :disabled="Boolean(!this.state)">个人信息</el-menu-item>
      <div class="load">
        <a @click="load">登录</a>
        <a @click="register">注册</a>
        <a @click="out">注销</a>
        <!-- <a @click="changeLocation">地址：{{this.location}}</a> -->
      </div>
    </el-menu>
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
    <transition mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
import Load from "./components/load";
import bus from "./bus";
export default {
  name: "App",
  components: { Load },
  data() {
    return {
      activeIndex: this.$route.name,
      show_home: 1,
      show_rigst: 0,
      show_rank: 0,
      show_personal: 0,
      show_listout: 0,
      dialogFormVisible: false
    };
  },
  beforeCreate() {
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  computed: {
    ...mapGetters({
      state: "get_state",
      house_list: "get_house_list",
      location: "get_location"
    }),
    ...mapState(["state", "location"])
  },
  methods: {
    ...mapActions([
      "request_house_list",
      "request_user_list",
      "change_location"
    ]),
    ...mapMutations(["set_state", "reset_house_list", "set_location"]),
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
      if (key == "houseList") {
        this.$router.push({ path: "/" });
      } else if (key == "rank") {
        this.reset_house_list();
        this.$router.push({ path: "/rank" });
      } else if (key == "list_out") {
        this.reset_house_list();
        this.$router.push({ path: "/list_out" });
      } else if (key == "personal") {
        this.reset_house_list();
        this.$router.push({ path: "/personal" });
      }
    },
    register: function() {
      this.$router.push({ path: "/regist" });
    },

    out: function() {
      if (this.state == 1) {
        this.set_state();
        this.user = null;
        this.houseList = "houseList";
        this.$notify({
          title: "注销成功",
          message: "当前以退出登录状态",
          type: "success"
        });
        // this.$router.push({ path: "/" });
        this.activeIndex = "houseList";
        this.handleSelect('houseList','houseList')
      } else {
        this.$notify({
          title: "注销失败",
          message: "当前尚未登录",
          type: "warning"
        });
      }
    },
    changeLocation: function() {
      this.change_location();
    }
  },
  mounted() {
    let script = document.createElement("script");
    script.src = "http://pv.sohu.com/cityjson?ie=utf-8";
    document.body.appendChild(script);
    this.request_house_list();
    this.request_user_list();
    // this.set_location(returnCitySN.cname);
  },
  created() {
    bus.$on("turn_detil", () => {
      this.activeIndex = "";
    });
  },
  beforeDestroy() {
    bus.$off("turn_detil");
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  margin-bottom: 10px;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(200px);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.8s ease;
}
body {
  /* margin-top: -50px; */
  background-color: rgba(0.1, 0.1, 0.1, 0.1);
}
a {
  text-decoration: none;
  cursor: pointer;
}
/* #location {
  float: right;
  overflow: auto;
  display: none;
} */
.load {
  padding-right: 20px;
  font-size: 15px;
  float: right;
  color: cornflowerblue;
}
.load a {
  padding-left: 10px;
}
</style>
