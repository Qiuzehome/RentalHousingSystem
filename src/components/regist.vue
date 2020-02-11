<template>
  <div class="container">
    <el-input type="text" placeholder="账号" v-model="user" />
    <b v-if="is_user" ref="err_user">{{this.err_user}}</b>
    <el-input type="password" placeholder="密码" v-model="psw" />
    <el-input type="password" placeholder="再次输入密码" v-model="psw0" ref="psw" />
    <b v-if="is_sim">密码不一致</b>
    <el-input type="text" placeholder="姓名" v-model="name" />
    <el-input type="text" placeholder="号码" v-model="phone" />
    <b v-if="is_phone">请输入正确号码</b>
    <el-input type="text" placeholder="邮箱" v-model="email" />
    <b v-if="is_email">请输入正确邮箱</b>
    <el-button @click="regist">确定并注册</el-button>
    <a @click="goback" id="a">已有账号，返回登录界面登录</a>
  </div>
</template>
<script>
import reg from "../reg";
import { mapState,mapMutations } from "vuex";
export default {
  data() {
    return {
      psw: null,
      psw0: null,
      user: null,
      name: null,
      phone: null,
      email: null,
      is_sim: 0,
      is_user: 0,
      is_email: 0,
      is_phone: 0,
      err_user: "该账号已存在"
    };
  },
  methods: {
    ...mapMutations(["reset_house_list"]),
    goback: function() {
      this.reset_house_list();
      this.$router.push({ path: "/" });
    },
    repeat: function() {
      if (this.psw != this.psw0 && this.psw != null) {
        this.is_sim = 1;
      } else {
        this.is_sim = 0;
      }
    },
    regist: function() {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].user == this.user) {
          this.$notify.error({
            title: "注册失败",
            message: "该账号已被注册"
          });
          this.user = null;
          return;
        }
      }
      if (this.is_phone == 1 || this.is_email == 1) {
        this.$notify.error({
          title: "注册失败",
          message: "请正确填写信息"
        });
        return;
      }
      if (
        this.psw0 == null ||
        this.psw == null ||
        this.user == null ||
        this.name == null ||
        this.email == null ||
        this.phone == null
      ) {
        this.$notify({
          title: "注册失败",
          message: "请完整填写信息",
          type: "warning"
        });
        return;
      }
      if (this.psw != this.psw0) {
        this.$notify({
          title: "注册失败",
          message: "两次输入密码不一致",
          type: "warning"
        });
        return;
      }
      this.axios({
        methods: "post",
        url: "/regist",
        params: {
          user: this.user,
          password: this.psw,
          name: this.name,
          phone: this.phone,
          email: this.email
        }
      }).then(result => {
        this.$notify({
          title: "注册成功",
          message: "注册成功，请前往主界面登录",
          type: "success"
        });
        this.$router.push({ path: "/" });
        location.reload();
      });
    }
  },
  computed: {
    ...mapState(["data"])
  },
  watch: {
    phone: function(phone) {
      if (!reg.phone(phone)) {
        this.is_phone = 1;
      } else {
        this.is_phone = 0;
      }
    },
    email: function(email) {
      if (!reg.email(email)) {
        this.is_email = 1;
      } else {
        this.is_email = 0;
      }
    },
    user: function(user) {
      if (user.length < 6 && user != "") {
        this.is_user = 1;
        this.err_user = "账号长度不得少于6";
        return;
      } else {
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].user == user) {
            this.is_user = 1;
            this.err_user = "该账号已被注册";
            return;
          } else {
            this.is_user = 0;
          }
        }
      }
    },
    psw0: function(psw0) {
      if (this.psw != psw0 && this.psw != null && psw0 != null) {
        this.is_sim = 1;
      } else {
        this.is_sim = 0;
      }
    },
    psw: function(psw) {
      if (psw != this.psw0 && psw != null && this.psw0 != null) {
        this.is_sim = 1;
      } else {
        this.is_sim = 0;
      }
    }
  }
};
</script>
<style>
.el-input__inner {
  width: 30%;
  margin: 10px;
}
#a {
  color: cornflowerblue;
  cursor: pointer;
}
ul {
  padding: 10px;
}
b {
  color: red;
}
.el-button {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>