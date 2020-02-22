<template>
  <div id="app">
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
      <div class="load">
        <a @click="load">登录</a>
        <a @click="register">注册</a>
        <a @click="out">注销</a>
        <a @click="changeLocation">{{this.location}}</a>
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
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
import Load from "./components/load";
export default {
  name: "App",
  components: { Load },
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      show_home: 1,
      show_rigst: 0,
      show_rank: 0,
      show_personal: 0,
      show_listout: 0,
      location: "广东",
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
    ...mapGetters({ state: "get_state", house_list: "get_house_list" }),
    ...mapState(["state"])
  },
  methods: {
    ...mapActions(["request_house_list", "request_user_list"]),
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
        this.$router.push({ path: "/" });
      } else if (key == 2) {
        this.reset_house_list();
        this.$router.push({ path: "/rank" });
      } else if (key == "3") {
        this.reset_house_list();
        this.$router.push({ path: "/list_out" });
      } else if (key == 4) {
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
  mounted() {
    this.request_house_list();
    this.request_user_list();
    //获取地址
    let script = document.createElement("script");
    script.src = "http://pv.sohu.com/cityjson?ie=utf-8";
    document.body.appendChild(script);
    script.addEventListener("load", function() {
      this.location = returnCitySN.cname;
    });
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
  margin-top: 60px;
  width: 100%;
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
  margin-top: -50px;
  /* background-color:rgba(0.1, 0.1, 0.1, 0.1); */
}
a {
  text-decoration: none;
  cursor: pointer;
}
#location {
  float: right;
  overflow: auto;
  display: none;
}
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
