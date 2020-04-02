<template>
  <div>
    <form action="http://localhost:8080" method="get">
      <el-input type="text" v-model="user" placeholder="账号:" />
      <el-input type="password" v-model="password" placeholder="密码:" />
      <el-button @click="load">登录</el-button>
    </form>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import cookie from "../cookie";
export default {
  data() {
    return {
      user: null,
      password: null
    };
  },
  computed: {
    ...mapState(["data"])
  },
  methods: {
    ...mapMutations(["set_state", "set_user"]),
    ...mapActions(["request_myhouse"]),
    load: function() {
      if (this.user != null && this.password != null) {
        this.axios({
          methods: "get",
          url: "/load",
          params: {
            user: this.user,
            password: this.password
          }
        }).then(result => {
          if (result.data == "ture") {
            this.$notify({
              title: "登录成功",
              message: "欢迎使用房屋租赁系统",
              type: "success"
            });

            cookie.setCookie(this.user, 7);
            setTimeout(() => {
              this.$emit("load_scuess");
            }, 1000);
            return;
          } else {
            this.$notify.error({
              title: "登录失败",
              message: "账号密码有误，请重新输入"
            });
            return;
          }
        });
      } else if (this.user == null || this.password == null) {
        this.$notify.error({
          title: "登录失败",
          message: "请输入账号密码"
        });

        return;
      } else {
        this.$notify.error({
          title: "登录失败",
          message: "账号密码有误，请重新输入"
        });
        this.user = null;
        this.password = null;
        return;
      }
    }
  }
};
</script>
<style scoped>
.el-input__inner {
  margin: 10px;
  width: 400px;
}
.el-button {
  text-align: center;
  margin: 10px 40% 0;
}
</style>