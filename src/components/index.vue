<template>
  <div class="container" id="app">
    <div class="col-md-6 col-md-offset-3">
      <ol class="list-group">
        <ul>
          <span></span>
          <b>账号:</b>
          <input type="text" v-model="user" />
        </ul>
        <ul class="list-group-item">
          <span></span>
          <b>密码:</b>
          <input type="password" v-model="password" />
        </ul>
        <ul class="list-group-item">
          <!-- <el-button>登录</el-button> -->
          <input type="button" value="登录" id="load" @click="load" />
          <input type="button" value="注册" id="regist" @click="regist" />
          <a href>忘记密码</a>
        </ul>
        <ul class="list-group-item">
          <label v-for="datas in radios">
            <input type="radio" name="usertype" :value="datas.type" v-model="usertype" />
            {{datas.value}}
          </label>
        </ul>
      </ol>
    </div>
    <!-- <abc></abc> -->
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: null,
      radios: [{ value: "我是房东", type: 1 }, { value: "我是房客", type: 2 }],
      password: null,
      usertype: 0,
      landlord_data:null,
      tenant_data:null
    };
  },
  methods: {
    load:function() {
      if(this.usertype==0){
        alert('请选择用户类型');
      }
      else if(this.usertype==1){
        this.$router.push({path:'/home'});
      }
      else if(this.usertype==2){
        this.$router.push({path:'/home'});
      }
     
    },
    regist: function() {
      this.$router.push({ path: "/regist" });
    }
  }
};
</script>