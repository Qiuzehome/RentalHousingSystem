<template>
  <div class="personal">
    <table>
      <tr>
        <td>账号</td>
        <td style="width:400px">
          <el-input placeholder="账号" type="text" v-model="user" disabled="disabled" />
        </td>
      </tr>
      <tr>
        <td>用户名</td>
        <td>
          <el-input placeholder="姓名" type="text" v-model="name" />
        </td>
      </tr>
      <tr>
        <td>修输入新密码</td>
        <td>
          <el-input placeholder="修输入新密码" type="password" v-model="psw" />
        </td>
        <td v-if="this.err_password">
          <b>密码长度不可小于6大于16</b>
        </td>
      </tr>
      <tr>
        <td>确认新密码</td>
        <td>
          <el-input placeholder="确认新密码" type="password" v-model="psw0" />
        </td>
        <td v-if="this.err_psw">
          <b>密码不一致</b>
        </td>
      </tr>

      <tr>
        <td>修改绑定号码</td>
        <td>
          <el-input placeholder="修改绑定号码" type="text" v-model="phone" />
        </td>
        <td v-if="this.err_phone">
          <b>号码格式错误</b>
        </td>
      </tr>
      <tr>
        <td>修改绑定邮箱</td>
        <td>
          <el-input placeholder="修改绑定邮箱" type="text" v-model="email" />
        </td>
        <td v-if="this.err_email">
          <b>邮箱格式错误</b>
        </td>
      </tr>
    </table>
    <el-button class="sure" @click="edit">确认修改资料</el-button>
  </div>
</template>
<script>
import reg from "../reg";
export default {
  data() {
    return {
      user: this.$store.state.user.user,
      name: this.$store.state.user.name,
      psw: null,
      psw0: null,
      email: this.$store.state.user.email,
      phone: this.$store.state.user.phone,
      err_psw: 0,
      err_phone: 0,
      err_email: 0,
      err_password: 0
    };
  },
  methods: {
    edit() {
      if (
        this.err_psw == 1 ||
        this.err_phone == 1 ||
        this.err_email == 1 ||
        this.err_password == 1
      ) {
        this.$notify({
          title: "修改信息失败",
          message: "请正确填写信息",
          type: "warning"
        });
      } else {
        this.axios({
          methods: "post",
          url: "/re_personal",
          params: {
            user: this.$store.state.user.user,
            name: this.name,
            psw: this.psw,
            email: this.email,
            phone: this.phone
          }
        });
      }
    }
  },
  watch: {
    phone: function(phone) {
      if (!reg.phone(phone)) {
        this.err_phone = 1;
      } else {
        this.err_phone = 0;
      }
    },
    email: function(email) {
      if (!reg.email(email)) {
        this.err_email = 1;
      } else {
        this.err_email = 0;
      }
    },
    psw: function(psw) {
      if (!reg.re_psw(psw, this.psw0)) {
        this.err_psw = 1;
      } else {
        this.err_psw = 0;
      }
      if (!reg.psw(psw)) {
        this.err_password = 1;
      } else {
        this.err_password = 0;
      }
    },
    psw0: function(psw0) {
      if (!reg.re_psw(psw0, this.psw)) {
        this.err_psw = 1;
      } else {
        this.err_psw = 0;
      }
    }
  }
};
</script>
<style scoped>
.el-input.is-disabled {
  padding: 0;
}
.el-input__inner {
  left: 0;
  width: 100%;
  margin: 0;
}
table {
  left: 0;
  margin-left: 20%;
}
input.el-input__inner{
  margin: 10px;
}
b {
  color: red;
}
.sure{
  margin: 10px auto;
}
.personal{
  background-color: white;
  width: 60%;
  margin: 0 auto;
}
</style>
